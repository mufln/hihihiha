from passlib.hash import sha512_crypt as crypt
import random
import psycopg
import string
from typing import Annotated, Optional

from fastapi import Depends, HTTPException, APIRouter, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from starlette import status

from db import get_db
from models import User, DbModel
from data_requests import UserCreateRequest

router = APIRouter(prefix="/auth")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


class Token(DbModel):
    __tablename__ = 'tokens'
    token: str
    user_id: int


async def get_current_user(token: Annotated[Optional[str], Depends(oauth2_scheme)],
                           request: Request,
                           db: Annotated[psycopg.Connection, Depends(get_db)]):
    session_token = token or request.cookies.get("SID")
    print(request.cookies.get("SID"))
    user = Token.select().where("token = %s", (session_token,)).single().on(db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return User.select().where("id = %s", (user.user_id,)).single().on(db)


async def get_current_active_user(
        current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_admin(
        current_active_user: Annotated[User, Depends(get_current_active_user)],
):
    if not current_active_user.role == "admin":
        raise HTTPException(status_code=400, detail="Not admin")
    return current_active_user


def hash_password(password: str):
    return crypt.hash(password)


@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: Annotated[psycopg.Connection, Depends(get_db)],
                response: Response,
                bearer: bool = True):
    user = User.select().where("username = %s", (form_data.username,)).single().on(db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not crypt.verify(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    s = string.ascii_lowercase + string.ascii_uppercase + string.digits
    token = ''.join(random.choice(s) for _ in range(32))
    db.execute("INSERT INTO tokens (token, user_id) VALUES (%s, %s)", (token, user.id))
    db.commit()
    if not bearer:
        response.set_cookie("SID", token, httponly=True, secure=True, samesite="none")
        return
    return {"access_token": token, "token_type": "bearer"}


@router.post("/register")
async def register(user: UserCreateRequest, db: Annotated[psycopg.Connection, Depends(get_db)]):
    any_user = User.select().single().on(db)
    is_admin = True if any_user is None else False
    hashed_password = hash_password(user.password)
    db.execute("INSERT INTO users (username, email, full_name, disabled, password, role) VALUES (%s, %s, %s, %s, %s, %s)",
               (user.username, user.email, user.full_name, False, hashed_password, "admin" if is_admin else "user"))
    db.commit()
    return {"msg": "User registered successfully"}