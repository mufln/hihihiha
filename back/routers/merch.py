import datetime
import psycopg
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from db import get_db
from models import Merch, DbModel
from data_requests import MerchCreateRequest, MerchUpdateRequest
from responses import MerchResponse
from routers import auth

router = APIRouter(prefix="/merch")

@router.get("/")
async def get_merch_items(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    items = Merch.select().many().on(db)
    res = []
    for item in items:
        res.append(MerchResponse(**item.model_dump()))
        res[-1].media = [
            {
                "filename": "/static/" + item["filename"],
                "thumbnail": "/static/" + item["thumbnail"],
            } for item in db.execute(
                "SELECT filename, thumbnail from resources JOIN (SELECT * FROM merch_resources WHERE merch_id = %s) ON resources.id = resource_id",
                (item.id,)).fetchall()
        ]
    return res


@router.post("/")
async def create_merch_item(
        merch: MerchCreateRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
        _admin: Annotated[int, Depends(auth.get_admin)],
):
    merch_id = db.execute(
        "INSERT INTO merch (name, description, price, created_at) VALUES (%s, %s, %s, %s) RETURNING id",
        (merch.name, merch.description, merch.price,
         datetime.datetime.now(datetime.UTC).strftime("%Y-%m-%d %H:%M:%S"))).fetchone()["id"]
    db.cursor().executemany("INSERT INTO merch_resources (merch_id, resource_id) VALUES (%s, %s)", [
        (merch_id, resource_id) for resource_id in merch.media
    ])
    db.commit()
    return {"message": "Merch item created"}

@router.post("/{id}")
async def update_merch_item(
        id: int,
        request: MerchUpdateRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
        _admin: Annotated[int, Depends(auth.get_admin)],
):
    merch = Merch.select().where("id = %s", (id,)).single().on(db)
    if not merch:
        raise HTTPException(status_code=404, detail="Merch item not found")
    if request.name:
        db.execute("UPDATE merch SET name = %s WHERE id = %s", (request.name, id))
    if request.description:
        db.execute("UPDATE merch SET description = %s WHERE id = %s", (request.description, id))
    if request.price:
        db.execute("UPDATE merch SET price = %s WHERE id = %s", (request.price, id))
    if request.media:
        db.cursor().executemany("DELETE FROM merch_resources WHERE merch_id = %s", [(id,)])
        db.cursor().executemany("INSERT INTO merch_resources (merch_id, resource_id) VALUES (%s, %s)", [
            (id, resource_id) for resource_id in request.media
        ])
    db.commit()
    return {"message": "Merch item updated"}

@router.delete("/{id}")
async def delete_merch_item(
        id: int,
        db: Annotated[psycopg.Connection, Depends(get_db)],
        _admin: Annotated[int, Depends(auth.get_admin)],
):
    merch = Merch.select().where("id = %s", (id,)).single().on(db)
    if not merch:
        raise HTTPException(status_code=404, detail="Merch item not found")
    db.execute("DELETE FROM merch_resources WHERE merch_id = %s", (id,))
    db.execute("DELETE FROM merch WHERE id = %s", (id,))
    db.commit()
    return {"message": "Merch item deleted"}
