CREATE TABLE users
(
    id        SERIAL PRIMARY KEY,
    username  TEXT    NOT NULL,
    full_name TEXT,
    email     TEXT,
    disabled  BOOLEAN NOT NULL,
    password  TEXT    NOT NULL
);
