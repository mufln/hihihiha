import psycopg
from io import BytesIO
from pathlib import Path
from typing import Annotated
from uuid import uuid4

from PIL.Image import DecompressionBombError
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from pydantic import BaseModel

from db import get_db
from models import Resource, User
from routers.auth import get_admin
from PIL import Image
router = APIRouter(prefix="/resources")

STATIC_DIR = Path("./static")

class ResourceResponse(BaseModel):
    id: int
    filename: str
    thumbnail: str

@router.post("")
async def create_resource(
        db: Annotated[psycopg.Connection, Depends(get_db)],
        admin: Annotated[User, Depends(get_admin)],
        file: UploadFile = File(...),
) -> ResourceResponse:
    contents = await file.read()
    thumbnail = None
    try:
        match file.content_type:
            case "image/png":
                ext = ".png"
                image = Image.open(file.file)
                image.thumbnail((1600, 900))
                io = BytesIO()
                image.convert("RGB").save(io, format="JPEG")
                thumbnail = io.getvalue()
            case "image/jpeg":
                ext = ".jpg"
                image = Image.open(file.file)
                image.thumbnail((1600, 900))
                io = BytesIO()
                image.save(io, format="JPEG")
                thumbnail = io.getvalue()
            case "image/gif":
                ext = ".gif"
            case "image/webp":
                ext = ".webp"
            case _:
                raise HTTPException(status_code=400, detail="Unsupported file type")
    except DecompressionBombError:
        raise HTTPException(status_code=400, detail="Image resolution too big")
    filename = str(uuid4()) + ext
    while STATIC_DIR.joinpath(filename).exists():
        filename = str(uuid4()) + ext
    thumbnail_filename = str(uuid4()) + ".jpg"
    while STATIC_DIR.joinpath(thumbnail_filename).exists():
        thumbnail_filename = str(uuid4()) + ".jpg"
    id = db.execute("INSERT INTO resources (filename, thumbnail, owner_id) VALUES (%s, %s, %s) RETURNING id", (filename, thumbnail_filename, admin.id)).fetchone()["id"]
    with open(STATIC_DIR / filename, "wb") as f:
        f.write(contents)
    if thumbnail is not None:
        with open(STATIC_DIR / thumbnail_filename, "wb") as f:
            f.write(thumbnail)
    db.commit()
    return ResourceResponse(id=id, filename=filename, thumbnail=thumbnail_filename)


@router.get("/{id}", response_model=ResourceResponse)
async def get_resource(
        db: Annotated[psycopg.Connection, Depends(get_db)],
        id: int,
) -> ResourceResponse:
    file = Resource.select().where("id = %s", (id,)).single().on(db)
    if file is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    return ResourceResponse(id=id, filename=file.filename, thumbnail=file.thumbnail)