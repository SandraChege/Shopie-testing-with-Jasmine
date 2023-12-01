-- USE shopie

-- SELECT * from Users

CREATE OR ALTER PROCEDURE updateUserDetails
@userName VARCHAR(200),
@phone_no NUMERIC(20),
@userID VARCHAR (200)
AS
BEGIN
    UPDATE Users
    SET userName = @userName, phone_no = @phone_no
    WHERE userID = @userID
END