-- use shopie

-- SELECT * from Users

CREATE OR ALTER PROCEDURE loginUser(
    @email varchar(200),
    -- @isDeleted VARCHAR(250),
    @password VARCHAR(200)
)
AS
BEGIN
    -- SELECT * FROM Users WHERE email = @email AND isDeleted = 0
    SELECT * FROM Users WHERE email = @email
END

DROP PROCEDURE loginUser