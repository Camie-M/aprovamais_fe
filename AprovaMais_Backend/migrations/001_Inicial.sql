CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  school VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS questoes (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  test VARCHAR(100) NOT NULL,
  theme TEXT[] NOT NULL,
  subject TEXT[] NOT NULL,
  topic TEXT[] NOT NULL,
  difficulty FLOAT NOT NULL,
  question TEXT NOT NULL,
  image VARCHAR(255),
  correct CHAR(1) NOT NULL,
  solution TEXT
);

CREATE TABLE IF NOT EXISTS alternatives (
  id SERIAL PRIMARY KEY,
  letter CHAR(1) NOT NULL,
  text TEXT,
  image VARCHAR(255),
  questao_id INT REFERENCES questoes(id) ON DELETE CASCADE
);
