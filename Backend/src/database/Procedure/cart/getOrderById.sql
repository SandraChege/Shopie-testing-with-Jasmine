CREATE OR ALTER PROCEDURE getOrderById
	@orderID VARCHAR(100)
AS
BEGIN
    SELECT * FROM orders
    WHERE orderID = @orderID
    AND isDeleted = 0
END