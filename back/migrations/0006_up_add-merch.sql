CREATE TABLE merch
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT         NOT NULL,
    price       INT          NOT NULL,
    created_at  TEXT         NOT NULL
);

CREATE TABLE merch_resources
(
    merch_id    INT NOT NULL,
    resource_id INT NOT NULL,
    FOREIGN KEY (resource_id) REFERENCES resources (id),
    FOREIGN KEY (merch_id) REFERENCES merch (id)
);