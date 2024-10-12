import psycopg
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, status

from db import get_db
from models import User
from data_requests import UserUpdateRequest
from responses import UserResponse, PostResponse
from routers import auth

router = APIRouter(prefix="/users")


@router.get("/me", response_model=UserResponse)
async def read_users_me(
        current_user: Annotated[User, Depends(auth.get_current_active_user)],
):
    return current_user

class ExtendedUserResponse(UserResponse):
    role: Literal["admin", "user"]
    disabled: bool
    posts: list[PostResponse]

@router.get("/{username}", response_model=UserResponse)
async def read_users(
        username: str,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    user = User.select().where("username = %s", (username,)).single().on(db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.get("/", response_model=list[ExtendedUserResponse])
async def read_users(
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    users = User.select().many().on(db)
    return list(map(lambda x: ExtendedUserResponse(**x.model_dump(), posts=[]), users))


@router.post("/{id}")
async def update_user(
        id: int,
        request: UserUpdateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    user = User.select().where("id = %s", (id,)).single().on(db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.execute("UPDATE users SET role = %s, disabled = %s WHERE id = %s",
               (request.role if request.role is not None else user.role,
                request.disabled if request.disabled is not None else user.disabled, id))
    db.commit()
    return {"message": "User updated"}
