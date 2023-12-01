CREATE or alter PROCEDURE [dbo].[updateProduct]
	(@productID varchar(100) ,
	@title varchar(100) ,	
	@description varchar(250) ,
	@image varchar(500),
    @price int,
    @category varchar(100) ,
    @stock int )
as

set nocount on;

begin
	UPDATE products
	SET 
	
      title = @title,
      price = @price,
      image = @image,
      category = @category,
      description = @description,
      stock = @stock
	
	WHERE productID = @productID ;
end;