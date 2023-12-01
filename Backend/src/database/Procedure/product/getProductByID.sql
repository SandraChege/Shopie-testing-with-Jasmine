CREATE or alter PROCEDURE getProductById
	@productID VARCHAR(100)
as

set nocount on;

begin
	select *  from products  
	
    where productID = @productID and isDeleted = 0
   
end;