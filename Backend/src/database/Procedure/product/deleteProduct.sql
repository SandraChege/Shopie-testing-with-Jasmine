CREATE OR ALTER  PROCEDURE deleteProduct
	@productID varchar(100)
as

set nocount on;

begin
	UPDATE products
	SET isDeleted = 1
	
	WHERE productID = @productID;
end;