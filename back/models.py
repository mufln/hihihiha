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

class Player(DbModel):
    __tablename__ = "players"
    id: int
    name: str
    role: str
    bio: str
    joined_at: datetime
    left_at: datetime | None = None

class Stats(DbModel):
    __tablename__ = "stats"
    id: int
    season_name: str
    player_id: int
    games: int
    goals : int
    passes : int
    yellow_cards : int
    red_cards : int
    created_at: datetime

class Match(BaseModel):
    id: int
    op1_id: int
    op2_id: int
    op1_score: int
    op2_score: int
    math_date: datetime
    created_at: datetime
    is_finished: bool

class Team(BaseModel):
    id: int
    name: str
    logo: str

