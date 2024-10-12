import psycopg
import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from db import get_db
from models import User
from data_requests import PostCreateRequest
from responses import PostResponse
from routers import auth

router = APIRouter(prefix="/posts")


@router.get("/")
async def read_posts(
        db: Annotated[psycopg.Connection, Depends(get_db)],
) -> list[PostResponse]:
    posts = db.execute("SELECT * FROM posts ORDER BY created_at DESC").fetchall()
    posts = [PostResponse(**post) for post in posts]
    for post in posts:
        media = db.execute(
            "SELECT filename, thumbnail from resources JOIN (SELECT * FROM post_resources WHERE post_id = %s) ON resources.id = resource_id",
            (post.id,)).fetchall()
        post.created_at = post.created_at.strftime("%Y %m %d - %H:%M")
        post.media = [
            {
                "filename": "/static/" + item["filename"],
                "thumbnail": "/static/" + item["thumbnail"],
            } for item in media
        ]

    return posts


@router.post("/")
async def create_post(
        admin: Annotated[User, Depends(auth.get_admin)],
        post: PostCreateRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    post_id = db.execute(
        "INSERT INTO posts (title, text_md, author_id, created_at, updated_at) VALUES (%s, %s, %s, %s, %s) RETURNING id", (
            post.title,
            post.text_md,
            admin.id,
            datetime.datetime.now(datetime.UTC),
            datetime.datetime.now(datetime.UTC),
        )).fetchone()["id"]

    try:
        for resource_id in post.media:
            db.execute("INSERT INTO post_resources (post_id, resource_id) VALUES (%s, %s)", (post_id, resource_id))
    except psycopg.errors.ForeignKeyViolation:
        raise HTTPException(status_code=400, detail="Media not found")
    db.commit()
    return


@router.post("/{id}")
async def update_post(
        id: int,
        post: PostCreateRequest,
        db: Annotated[psycopg.Connection, Depends(get_db)],
):
    post_id = db.execute("SELECT id FROM posts WHERE id = %s", (id,)).fetchone()
    if not post_id:
        raise HTTPException(status_code=404, detail="Post not found")
    post_id = post_id["id"]
    if post.title:
        db.execute("UPDATE posts SET title = %s WHERE id = %s", (post.title, id))
    if post.text_md:
        db.execute("UPDATE posts SET text_md = %s WHERE id = %s", (post.text_md, id))
    if post.media:
        db.cursor().executemany("DELETE FROM post_resources WHERE post_id = %s", [(post_id,)])
        db.cursor().executemany("INSERT INTO post_resources (post_id, resource_id) VALUES (%s, %s)", [
            (post_id, resource_id) for resource_id in post.media
        ])
    db.execute("UPDATE posts SET updated_at = %s WHERE id = %s", (datetime.datetime.now(datetime.UTC), id))
    db.commit()
    return {"message": "Post updated"}