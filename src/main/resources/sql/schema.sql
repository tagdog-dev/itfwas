DROP TABLE IF EXISTS sample;

CREATE TABLE sample
(
    idx     IDENTITY        PRIMARY KEY,
    nm      VARCHAR(255)    NOT NULL,
    cn      VARCHAR(5000)   NOT NULL
);