CREATE OR ALTER PROCEDURE createneworder
    (@orderID VARCHAR (255),
    @userID VARCHAR (255),
    @productID VARCHAR (255),
    @price INT,
    @count INT)
AS
BEGIN
    INSERT INTO orders
    (orderID, userID, productID, price, count)
    VALUES
    (@orderID, @userID, @productID, @price,@count)
END