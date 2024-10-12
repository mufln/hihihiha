from datetime import datetime
from typing import Literal, Self, Annotated

from pydantic import BaseModel, BeforeValidator

from query_generator import QueryGenerator


class DbModel(BaseModel):
    @classmethod
    def select(cls) -> QueryGenerator['Self']:
        return QueryGenerator(
            cls.__tablename__,
            list(cls.model_fields.keys()),
            cls,
            "select",
        )

    def insert(self) -> QueryGenerator:
        v = list(iter(self.model_dump().items()))
        return QueryGenerator(
            self.__tablename__,
            list(map(lambda x: x[0], v)),
            self.__class__,
            "insert",
            values=list(map(lambda x: x[1], v)),
        )


class User(DbModel):
    __tablename__ = "users"
    id: int
    password: str
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
    role: Literal["admin", "user"] = "user"


class Post(DbModel):
    __tablename__ = "posts"
    title: str
    text_md: str
    author_id: str
    created_at: datetime
    updated_at: datetime


class Resource(DbModel):
    __tablename__ = "resources"
    id: int
    filename: str
    thumbnail: str
    owner_id: int

class Merch(DbModel):
    __tablename__ = "merch"
    id: int
    name: str
    description: str
    price: int
    created_at: datetime
