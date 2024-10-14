import datetime
from typing import Literal

from pydantic import BaseModel

from models import DbModel


class UserResponse(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    role: Literal["admin", "user"]


class PostResponse(DbModel):
    id: int
    title: str
    text_md: str
    media: list[dict[str, str]] = []
    created_at: datetime.datetime
    updated_at: datetime.datetime

class MerchResponse(DbModel):
    name: str
    description: str
    price: int
    media: list[dict[str, str]] = []

class StatsResponse(DbModel):
    id: int
    season_name: str
    player_id: int
    games: int
    goals : int
    passes : int
    yellow_cards : int
    red_cards : int
    created_at: datetime.datetime

class PlayerResponse(DbModel):
    id: int
    name: str
    role: str
    bio: str
    stats: list[StatsResponse] = []
    joined_at: datetime.datetime
    left_at: datetime.datetime | None = None
    media: list[dict[str, str]] = []

class TeamResponse(DbModel):
    id: int
    name: str
    logo: str | None = ''

class MatchResponse(DbModel):
    id: int
    op1_id: int
    op1: TeamResponse | None = None
    op2_id: int
    op2: TeamResponse | None = None
    op1_score: int
    op2_score: int
    math_date: datetime.datetime
    created_at: datetime.datetime
    tour: str
    location: str
    is_finished: bool

