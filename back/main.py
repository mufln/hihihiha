import os
import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from cfg import *
from routers import auth, users, posts, resources, merch, team, matches, teams

app = FastAPI(
    description="kokoc api",
)

allowed_hosts = ["http://127.0.0.1:3000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import FastAPI

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(resources.router)
app.include_router(merch.router)
app.include_router(team.router)
app.include_router(matches.router)
app.include_router(teams.router)

app.mount("/static", StaticFiles(directory="./static"), name="static")

if __name__ == "__main__":
    os.system(f"python3 migrate.py 'host={DB_HOST} dbname={DB_NAME} user={DB_USER} password={DB_PASS}' latest")
    uvicorn.run(app, host="0.0.0.0", port=8000)