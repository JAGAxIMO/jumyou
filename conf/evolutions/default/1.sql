# --- !Ups

CREATE TABLE IF NOT EXISTS users(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(32) NOT NULL,
  mailAddress varchar(64) NOT NULL UNIQUE,
  password varchar(65) NOT NULL,
  age tinyint UNSIGNED NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users(
  name, mailAddress, password, age
) values (
  'yoshiki', 'yoshiki@jumyou.com', '8618b88786eeffa7b153c2c1c89539b4cd014e0aa2d60d81d4085d2b1898158e', 85
);

INSERT INTO users(
  name, mailAddress, password, age
) values (
  'imo', 'imo@jumyou.com', '8618b88786eeffa7b153c2c1c89539b4cd014e0aa2d60d81d4085d2b1898158e', 85
);