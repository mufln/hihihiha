CREATE TABLE cart_items
(
    user_id  INTEGER NOT NULL,
    merch_id INTEGER NOT NULL,
    count    INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (merch_id) REFERENCES merch (id)
);
