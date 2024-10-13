CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    op1_id INT NOT NULL,
    op2_id INT NOT NULL,
    op1_score INT DEFAULT 0,
    op2_score INT DEFAULT 0,
    math_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    is_finished BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (op1_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (op2_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE team_resources (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    resource_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);
