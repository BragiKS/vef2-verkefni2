INSERT INTO users (name, username, password, admin) VALUES ('Óli admin', 'admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', true);

INSERT INTO teams (name) VALUES ("Boltaliðið",
  "Dripplararnir",
  "Skotföstu kempurnar",
  "Markaskorarnir",
  "Sigurliðið",
  "Risaeðlurnar",
  "Framherjarnir",
  "Fljótu fæturnir",
  "Vinningshópurinn",
  "Ósigrandi skotfólkið",
  "Óhemjurnar",
  "Hraðaliðið");

INSERT INTO games (home, away, home_score, away_score) VALUES ('Dripplararnir', 'Óhemjurnar', 3, 5);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Skotföstu kepurnar', 'Vinningshópurinn', 1, 0);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Fljótu fæturnir', 'Hraðaliðið', 5, 2);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Framherjarnir', 'Markaskorarnir', 2, 2);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Risaeðlurnar', 'Óhemjurnar', 1, 4);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Boltaliðið', 'Sigurliðið', 2, 3);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Ósigrandi skotfólið', 'Markaskorarnir', 2, 0);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Boltaliðið', 'Sigurliðið', 1, 3);
INSERT INTO games (home, away, home_score, away_score) VALUES ('Fljótu fæturnir', 'Óhemjurnar', 3, 5);