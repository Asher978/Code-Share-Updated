-- \c code_share;

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    time TIME
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL ,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL
);
ALTER TABLE events 
ADD COLUMN user_id INTEGER REFERENCES users(id);

