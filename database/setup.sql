DROP TABLE users;
CREATE TABLE users (
    id          SERIAL,
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    email       VARCHAR(50),
    phone       VARCHAR(50),
    signupdate  date,
    username    varchar(50),
    password    varchar(256)
);

DROP TABLE goodhabits;
CREATE TABLE goodhabits (
    id           SERIAL,
    userid       INTEGER,
    habitname    VARCHAR(50),
    description  VARCHAR(50),
    interval      INTEGER,
    duration     INTEGER,
    reminderFreq INTEGER,
    reminderType VARCHAR(50)
);

DROP TABLE habitlog;
CREATE TABLE habitlog (
    id           SERIAL,
    userid       INTEGER,
    habitid      INTEGER,
    logdate      timestamptz default current_timestamp
);
