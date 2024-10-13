from datetime import datetime
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

class PlayerCreateRequest(BaseModel):
    id: int
    name: str
    role: str
    bio: str
    joined_at: datetime
    left_at: datetime | None = None
    media: list[int]

class PlayerUpdateRequest(BaseModel):
    name: str | None = None
    role: str | None = None
    bio: str | None = None
    joined_at: datetime | None = None
    left_at: datetime | None = None
    media: list[int] | None = None

class StatsCreateRequest(BaseModel):
    season_name: str
    player_id: int
    games: int
    goals : int
    passes : int
    yellow_cards : int
    red_cards : int

class StatsUpdateRequest(BaseModel):
    season_name: str | None = None
    games: int | None = None
    goals : int | None = None
    passes : int | None = None
    yellow_cards : int | None = None
    red_cards : int | None = None

class MatchCreateRequest(BaseModel):
    op1_id: int
    op2_id: int
    op1_score: int | None = None
    op2_score: int | None = None
    match_date: datetime

class MatchUpdateRequest(BaseModel):
    op1_id: int | None = None
    op2_id: int | None = None
    op1_score: int | None = None
    op2_score: int | None = None
    math_date: datetime | None = None

class TeamCreateRequest(BaseModel):
    name: str
    logo_id: int | None = None

class TeamUpdateRequest(BaseModel):
    name: str | None = None
    logo_id: int | None = None