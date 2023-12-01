-- SELECT * FROM Users

CREATE TABLE Users (
    userID VARCHAR(300) NOT NULL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_no NUMERIC (20) UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    role varchar(20) DEFAULT 'user',
    isDeleted bit DEFAULT 0,   
    Welcomed bit DEFAULT 0,
);

-- DROP TABLE Users

-- created the admin
-- ALTER TABLE Users 
-- ADD  resetPassword bit DEFAULT 0

-- set role = 'admin'
-- where email = '9superbikes@gmail.com'

delete from Users 
where email = 'chegemwihaki88@gmail.com'

-- UPDATE Users
-- SET resetPassword = 0
