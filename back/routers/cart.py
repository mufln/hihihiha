import psycopg

from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

from pydantic import BaseModel

from db import get_db
from models import User, Merch, DbModel
from routers import auth

router = APIRouter(prefix="/cart")


class AddToCartRequest(BaseModel):
    id: int


class CartItem(DbModel):
    __tablename__ = "cart_items"
    user_id: int
    merch_id: int
    count: int


@router.post("/add")
async def add_to_cart(
        current_user: Annotated[User, Depends(auth.get_current_active_user)],
        request: AddToCartRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    merch = Merch.select().where("id = %s", (request.id,)).single().on(db)
    if merch is None:
        raise HTTPException(status_code=404, detail="Merch item not found")
    item = CartItem.select().where("user_id = %s AND merch_id = %s", (current_user.id, request.id)).single().on(db)
    if item is None:
        item = CartItem(user_id=current_user.id, merch_id=request.id, count=1)
        item.insert().on(db)
    else:
        db.execute("UPDATE cart_items SET count = %s WHERE user_id = %s and merch_id = %s",
                   (item.count + 1, current_user.id, request.id))
    db.commit()
    return {"message": "Added to cart"}


@router.post("/remove")
async def remove_from_cart(
        current_user: Annotated[User, Depends(auth.get_current_active_user)],
        request: AddToCartRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    cart_item = CartItem.select().where("user_id = %s AND merch_id = %s",
                                        (current_user.id, request.id)).single().on(db)
    if cart_item is None:
        raise HTTPException(status_code=404, detail="Merch item not found")
    if cart_item.count == 1:
        db.execute("DELETE FROM cart_items WHERE user_id = %s AND merch_id = %s", (current_user.id, request.id))
    else:
        db.execute("UPDATE cart_items SET count = %s WHERE user_id = %s AND merch_id = %s",
                   (cart_item.count - 1, current_user.id, request.id))
    db.commit()
    return {"message": "Removed from cart"}
