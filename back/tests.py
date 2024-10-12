import pytest
import sqlite3
from fastapi.testclient import TestClient
from main import app
from db import get_db

# Create an in-memory SQLite database for testing
@pytest.fixture(scope="module")
def test_db():
    conn = sqlite3.connect(':memory:')
    conn.row_factory = sqlite3.Row

    # Create tables
    with conn:
        conn.executescript("""
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE,
                full_name TEXT,
                disabled BOOLEAN NOT NULL DEFAULT 0,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user'
            );
            
            CREATE TABLE posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                text_md TEXT NOT NULL,
                author_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                FOREIGN KEY (author_id) REFERENCES users (id)
            );
            
            CREATE TABLE tokens (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
            
            -- Add other necessary tables here
        """)

    yield conn
    conn.close()

# Override the get_db dependency
def override_get_db(test_db):
    def _get_test_db():
        try:
            yield test_db
        finally:
            test_db.rollback()
    return _get_test_db

@pytest.fixture(scope="module")
def client(test_db):
    app.dependency_overrides[get_db] = override_get_db(test_db)
    with TestClient(app) as c:
        yield c

def test_register_user(client):
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword",
            "full_name": "Test User"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "User registered successfully"}

def test_login_user(client):
    # First, register a user
    client.post(
        "/auth/register",
        json={
            "username": "loginuser",
            "email": "login@example.com",
            "password": "loginpassword",
            "full_name": "Login User"
        }
    )

    # Now, try to login
    response = client.post(
        "/auth/login",
        data={"username": "loginuser", "password": "loginpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_create_post(client, test_db):
    # Register an admin user (first user is admin)
    client.post(
        "/auth/register",
        json={
            "username": "adminuser",
            "email": "admin@example.com",
            "password": "adminpassword",
            "full_name": "Admin User"
        }
    )

    # Login as admin
    login_response = client.post(
        "/auth/login",
        data={"username": "adminuser", "password": "adminpassword"}
    )
    token = login_response.json()["access_token"]

    # Create a post
    response = client.post(
        "/posts/",
        json={"title": "Test Post", "text_md": "This is a test post", "media": []},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200

def test_get_posts(client):
    response = client.get("/posts/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Add more tests for other endpoints and edge cases

if __name__ == "__main__":
    pytest.main(["-v"])
