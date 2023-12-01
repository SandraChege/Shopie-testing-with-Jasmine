CREATE OR ALTER PROCEDURE getAllOrders
AS 
BEGIN
    SELECT * FROM orders where isDeleted = 0
END
