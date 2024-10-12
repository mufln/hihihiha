import datetime

from pydantic import BaseModel

from models import DbModel, Datetime


class UserResponse(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None


class PostResponse(DbModel):
    id: int
    title: str
    text_md: str
    media: list[dict[str, str]] = []
    created_at: Datetime
    updated_at: Datetime

class MerchResponse(DbModel):
    name: str
    description: str
    price: int
    media: list[dict[str, str]] = []