USE ecoHabitationDb;
DROP TABLE IF EXISTS users;
CREATE TABLE users
( 
    user_id int AUTO_INCREMENT PRIMARY KEY,
    user_created datetime,
    user_name varchar(100),
    user_email varchar(100),
    user_role varchar(100),
    user_pass varchar(100)
);

INSERT INTO users VALUES (NULL, now(), 'sam', 'sam@sam.sam', 'USER', sha2(concat(now(), 'sampass'), 224) );
INSERT INTO users VALUES (NULL, now(), 'elouser', 'elo@elo.elo', 'USER', sha2(concat(now(), 'elopass'), 224) );
SELECT sleep(2);
INSERT INTO users VALUES (NULL, now(), 'eloadmin', 'elo@elo.elo', 'ADMIN', sha2(concat(now(), 'elopass'), 224) );

SELECT * FROM users;
