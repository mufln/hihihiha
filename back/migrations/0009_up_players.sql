CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    joined_at TIMESTAMP NOT NULL,
    left_at TIMESTAMP
);

CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    season_name VARCHAR(255) NOT NULL,
    player_id INT NOT NULL,
    games INT NOT NULL,
    goals INT NOT NULL,
    passes INT NOT NULL,
    yellow_cards INT NOT NULL,
    red_cards INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE player_resources (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL,
    resource_id INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);