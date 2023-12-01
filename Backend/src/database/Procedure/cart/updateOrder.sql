CREATE OR ALTER PROCEDURE updateOrder
(
    @productID VARCHAR(255),
    @userID VARCHAR(255),
    @price INT,
    @count INT,
    @orderID VARCHAR(255)
)
AS
BEGIN
    UPDATE orders
    SET productID = @productID, userID = @userID, price = @price, count = @count
    WHERE orderID = @orderID
END