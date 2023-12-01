CREATE OR ALTER PROCEDURE createProduct
(   @productID varchar(100) ,
	@title varchar(100) ,	
	@description varchar(250) ,
	@image varchar(500),
    @price int,
    @category varchar(100),
    @stock int   )
    
AS

BEGIN
    set nocount on;

    INSERT INTO products (productID, title, description, image, price, category, stock)
    VALUES (@productID, @title, @description, @image, @price, @category, @stock)
END

DROP PROCEDURE createProduct