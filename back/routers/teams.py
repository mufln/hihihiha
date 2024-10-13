import datetime

import psycopg
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, status

from db import get_db
from models import User, Match, Team
from data_requests import MatchCreateRequest, MatchUpdateRequest, TeamCreateRequest, TeamUpdateRequest
from responses import MatchResponse, TeamResponse
from routers import auth

router = APIRouter(prefix="/teams")

@router.get("", response_model=list[TeamResponse])
async def read_teams(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    teams = db.execute("SELECT * FROM teams ORDER BY created_at DESC").fetchall()
    teams = [TeamResponse(**team) for team in teams]
    for team in teams:
        team.logo = "static/" + db.execute("SELECT filename from resources join (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (team.id,)).fetchone()["filename"]
    return teams

@router.post("")
async def create_team(
        team: TeamCreateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    team_id = db.execute(
        "INSERT INTO teams (name, created_at) VALUES (%s, %s) RETURNING id", (
            team.name,
            datetime.datetime.now(datetime.UTC),
        )).fetchone()["id"]
    try:
        db.execute("INSERT INTO team_resources (team_id, resource_id) VALUES (%s, %s)", (team_id, team.logo_id))
    except psycopg.errors.ForeignKeyViolation:
        raise HTTPException(status_code=400, detail="Media not found")
    db.commit()
    return {"message": "Team created"}

@router.post("/{id}")
async def update_team(
        id: int,
        request: TeamUpdateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    team = Team.select().where("id = %s", (id,)).single().on(db)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if request.name:
        db.execute("UPDATE teams SET name = %s WHERE id = %s", (request.name, id))
    if request.media:
        db.cursor().execute("DELETE FROM team_resources WHERE team_id = %s", (id,))
        db.cursor().executemany("INSERT INTO team_resources (team_id, resource_id) VALUES (%s, %s)", [
            (id, resource_id) for resource_id in request.media
        ])
    db.commit()
    return {"message": "Team updated"}

@router.delete("/{id}")
async def delete_team(
        id: int,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    team = Team.select().where("id = %s", (id,)).single().on(db)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    db.execute("DELETE FROM team_resources WHERE team_id = %s", (id,))
    db.execute("DELETE FROM teams WHERE id = %s", (id,))
    db.commit()
    return {"message": "Team deleted"}