import datetime

import psycopg
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, status

from db import get_db
from models import Player, Stats, User
from data_requests import UserUpdateRequest, PlayerCreateRequest, PlayerUpdateRequest
from responses import PlayerResponse, StatsResponse
from routers import auth
router = APIRouter(prefix="/team")

@router.get("", response_model=list[PlayerResponse])
async def read_players(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    players = Player.select().many().on(db)
    res = []
    for player in players:
        res.append(PlayerResponse(**player.model_dump()))
        res[-1].stats = []
        res[-1].media = [
            {
                "filename": "/static/" + item["filename"],
                "thumbnail": "/static/" + item["thumbnail"],
            } for item in db.execute(
                "SELECT filename, thumbnail from resources JOIN (SELECT * FROM player_resources WHERE player_id = %s) ON resources.id = resource_id",
                (player.id,)).fetchall()
        ]
        res[-1].stats = list(map(lambda x: StatsResponse(**x.model_dump()), Stats.select().where("player_id = %s", (player.id,)).many().on(db)))

    return res

@router.get("/{player_id}", response_model=PlayerResponse)
async def read_player( player_id: int,db: Annotated[psycopg.Connection, Depends(get_db)]):
    player = Player.select().where("id = %s", (player_id,)).single().on(db)
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    res = PlayerResponse(**player.model_dump())
    res.stats = Stats.select().where("player_id = %s", (player_id,)).many().on(db)
    res.media = [
        {
            "filename": "/static/" + item["filename"],
            "thumbnail": "/static/" + item["thumbnail"],
        } for item in db.execute(
            "SELECT filename, thumbnail from resources JOIN (SELECT * FROM player_resources WHERE player_id = %s) ON resources.id = resource_id",
            (player.id,)).fetchall()
    ]
    return res

@router.post("")
async def create_player(
        player: PlayerCreateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    player_id = db.execute(
        "INSERT INTO players (name, role, bio, joined_at, left_at) VALUES (%s, %s, %s, %s, %s) RETURNING id", (
            player.name,
            player.role,
            player.bio,
            player.joined_at,
            player.left_at,
        )).fetchone()["id"]
    try:
        for resource_id in player.media:
            db.execute("INSERT INTO player_resources (player_id, resource_id) VALUES (%s, %s)", (player_id, resource_id))
    except psycopg.errors.ForeignKeyViolation:
        raise HTTPException(status_code=400, detail="Media not found")
    db.commit()
    return {"message": "Player created"}

@router.post("/{id}")
async def update_player(
        id: int,
        request: PlayerUpdateRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
):
    player = Player.select().where("id = %s", (id,)).single().on(db)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    if request.name:
        db.execute("UPDATE players SET name = %s WHERE id = %s", (request.name, id))
    if request.role:
        db.execute("UPDATE players SET role = %s WHERE id = %s", (request.role, id))
    if request.bio:
        db.execute("UPDATE players SET bio = %s WHERE id = %s", (request.bio, id))
    if request.joined_at:
        db.execute("UPDATE players SET joined_at = %s WHERE id = %s", (request.joined_at, id))
    if request.left_at:
        db.execute("UPDATE players SET left_at = %s WHERE id = %s", (request.left_at, id))
    if request.media:
        db.cursor().execute("DELETE FROM player_resources WHERE player_id = %s", (id,))
        db.cursor().executemany("INSERT INTO player_resources (player_id, resource_id) VALUES (%s, %s)", [
            (id, resource_id) for resource_id in request.media
        ])
    db.commit()
    return {"message": "Player updated"}

@router.delete("/{id}")
async def delete_player(
        id: int,
        db: Annotated[psycopg.Connection, Depends(get_db)],
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
):
    player = Player.select().where("id = %s", (id,)).single().on(db)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    db.execute("DELETE FROM player_resources WHERE player_id = %s", (id,))
    db.execute("DELETE FROM stats WHERE player_id = %s", (id,))
    db.execute("DELETE FROM players WHERE id = %s", (id,))
    db.commit()
    return {"message": "Player deleted"}