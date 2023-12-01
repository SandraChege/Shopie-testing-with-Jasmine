CREATE OR ALTER PROCEDURE deleteOrder
(@orderID VARCHAR(200))
AS
BEGIN
    UPDATE orders
    SET isDeleted = 1
    WHERE orderID = @orderID
END 

SELECT * FROM orders