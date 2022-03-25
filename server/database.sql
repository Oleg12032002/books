CREATE DATABASE bookshop;

CREATE TABLE books(
  item_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  item_id INT,
  description VARCHAR(255)
);