import datetime

from pydantic import BaseModel

from models import DbModel


class UserResponse(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None


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

