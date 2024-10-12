from typing import Literal

from pydantic import BaseModel

from models import DbModel


class PostCreateRequest(DbModel):
    __tablename__ = "posts"
    title: str
    text_md: str
    media: list[int]


class ResourceCreateRequest(DbModel):
    __tablename__ = "resources"
    filename: str


class UserCreateRequest(BaseModel):
    username: str
    password: str
    full_name: str
    email: str


class PostUpdateRequest(BaseModel):
    title: str | None = None
    text_md: str | None = None
    media: list[int] | None = None


class UserUpdateRequest(BaseModel):
    role: Literal["admin", "user"] | None = None
    disabled: bool | None = None


class MerchCreateRequest(BaseModel):
    name: str
    description: str
    price: int
    media: list[int]


class MerchUpdateRequest(BaseModel):
    name: str | None = None
    description: str | None = None
    price: int | None = None
    media: list[int] | None = None
