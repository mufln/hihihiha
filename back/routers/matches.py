import datetime

import psycopg
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from db import get_db
from models import User, Match
from data_requests import MatchCreateRequest, MatchUpdateRequest
from responses import MatchResponse, TeamResponse
from routers import auth

router = APIRouter(prefix="/matches")

@router.get('', response_model=list[MatchResponse])
async def read_matches(
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    matches = db.execute("SELECT * FROM matches ORDER BY math_date DESC").fetchall()
    matches = [MatchResponse(**match) for match in matches]
    for match in matches:
        match.op1 = TeamResponse(**db.execute("SELECT * FROM teams WHERE id = %s", (match.op1_id,)).fetchone())
        match.op1.logo = "static/" + db.execute("SELECT filename from resources JOIN (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (match.op1_id,)).fetchone()["filename"]
        match.op2 = TeamResponse(**db.execute("SELECT * FROM teams WHERE id = %s", (match.op2_id,)).fetchone())
        match.op2.logo = "static/" + db.execute("SELECT filename from resources JOIN (SELECT resource_id FROM team_resources WHERE team_id = %s) on resources.id = resource_id", (match.op2_id,)).fetchone()["filename"]
    return matches

@router.post("")
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
    if not request.is_finished is None:
        db.execute("UPDATE matches SET is_finished = %s WHERE id = %s", (request.is_finished, id))
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
    db.execute("DELETE FROM matches WHERE id = %s", (id,))
    db.commit()
    return {"message": "Match deleted"}


