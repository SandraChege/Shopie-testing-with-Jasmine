-- USE shopie

-- SELECT * from Users

CREATE OR ALTER PROCEDURE updatePassword
@password VARCHAR(200),
@email VARCHAR (200)
AS
BEGIN
    UPDATE Users
    SET password = @password 
    WHERE email = @email
END