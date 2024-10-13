import datetime

import psycopg
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, status

from db import get_db
from models import User, Match, Team
from data_requests import UserUpdateRequest, MatchCreateRequest, MatchUpdateRequest, TeamCreateRequest, \
    TeamUpdateRequest
from responses import MatchResponse, TeamResponse
from routers import auth

router = APIRouter(prefix="/matches")

@router.get('/', response_model=list[MatchResponse])
async def read_matches(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    matches = db.execute("SELECT * FROM matches ORDER BY math_date DESC").fetchall()
    matches = [MatchResponse(**match) for match in matches]
    for match in matches:
        match.created_at = match.created_at.strftime("%Y %m %d - %H:%M")
        match.math_date = match.math_date.strftime("%Y %m %d - %H:%M")
        match.op1 = TeamResponse(**db.execute("SELECT * FROM teams WHERE id = %s", (match.op1_id,)).fetchone())
        match.op1.logo = db.execute("SELECT filename from resources JOIN (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (match.op1_id,)).fetchone()["filename"]
        match.op2 = TeamResponse(**db.execute("SELECT * FROM teams WHERE id = %s", (match.op2_id,)).fetchone())
        match.op2.logo = db.execute("SELECT filename from resources JOIN (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (match.op2_id,)).fetchone()["filename"]
    return matches

@router.post("/")
async def create_match(
        match: MatchCreateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    match_id = db.execute(
        "INSERT INTO matches (op1_id, op2_id, op1_score, op2_score, math_date, created_at) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id", (
            match.op1_id,
            match.op2_id,
            match.op1_score,
            match.op2_score,
            match.match_date,
            datetime.datetime.now(datetime.UTC),
        )).fetchone()["id"]
    db.commit()
    return {"message": "Match created"}

@router.post("/{id}")
async def update_match(
        id: int,
        request: MatchUpdateRequest,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    match = Match.select().where("id = %s", (id,)).single().on(db)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    if request.op1_id:
        db.execute("UPDATE matches SET op1_id = %s WHERE id = %s", (request.op1_id, id))
    if request.op2_id:
        db.execute("UPDATE matches SET op2_id = %s WHERE id = %s", (request.op2_id, id))
    if request.op1_score:
        db.execute("UPDATE matches SET op1_score = %s WHERE id = %s", (request.op1_score, id))
    if request.op2_score:
        db.execute("UPDATE matches SET op2_score = %s WHERE id = %s", (request.op2_score, id))
    if request.math_date:
        db.execute("UPDATE matches SET math_date = %s WHERE id = %s", (request.math_date, id))
    db.commit()
    return {"message": "Match updated"}

@router.delete("/{id}")
async def delete_match(
        id: int,
        _admin: Annotated[User, Depends(auth.get_current_active_user)],
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    match = Match.select().where("id = %s", (id,)).single().on(db)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    db.execute("DELETE FROM team_resources WHERE match_id = %s", (id,))
    db.execute("DELETE FROM matches WHERE id = %s", (id,))
    db.commit()
    return {"message": "Match deleted"}


@router.get("/teams/", response_model=list[TeamResponse])
async def read_teams(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    teams = db.execute("SELECT * FROM teams ORDER BY created_at DESC").fetchall()
    teams = [TeamResponse(**team) for team in teams]
    for team in teams:
        team.logo = db.execute("SELECT filename from resources join (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (team.id,)).fetchone()["filename"]
    return teams

@router.post("/teams/")
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
        for resource_id in team.media:
            db.execute("INSERT INTO team_resources (team_id, resource_id) VALUES (%s, %s)", (team_id, resource_id))
    except psycopg.errors.ForeignKeyViolation:
        raise HTTPException(status_code=400, detail="Media not found")
    db.commit()
    return {"message": "Team created"}

@router.post("/teams/{id}")
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

@router.delete("/teams/{id}")
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