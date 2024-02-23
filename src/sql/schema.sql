CREATE TABLE IF NOT EXISTS public.teams (
  id serial primary key,
  name varchar(64) not null unique
);

CREATE TABLE IF NOT EXISTS public.games (
  id serial primary key,
  date timestamp with time zone not null default current_timestamp,
  home INTEGER NOT NULL,
  away INTEGER NOT NULL,
  home_score INTEGER NOT NULL CHECK (home_score >= 0),
  away_score INTEGER NOT NULL CHECK (away_score >= 0),

  CONSTRAINT fk_teams_home FOREIGN KEY (home) REFERENCES teams (id),
  CONSTRAINT fk_teams_away FOREIGN KEY (away) REFERENCES teams (id)
);

CREATE TABLE IF NOT EXISTS public.users (
  id serial primary key,
  username varchar(64) not null unique,
  name varchar(64) not null,
  password varchar(255) not null,
  admin boolean default false
);
