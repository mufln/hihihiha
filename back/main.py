import os
import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, users, posts, resources, merch

app = FastAPI(
    description="Sample Admin API, with user management, authentication, posts, and merch store endpoints",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
app.mount("/static", StaticFiles(directory="./static"), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)