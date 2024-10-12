CREATE TABLE resources
(
    id       SERIAL PRIMARY KEY,
    filename TEXT    NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE TABLE posts
(
    id         SERIAL PRIMARY KEY,
    title      TEXT    NOT NULL,
    text_md    TEXT    NOT NULL,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,
    author_id  INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE post_resources
(
    post_id     INTEGER NOT NULL,
    resource_id INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (resource_id) REFERENCES resources (id)
);
