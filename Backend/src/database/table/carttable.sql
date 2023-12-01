-- USE shopie;

-- SELECT * FROM orders;

CREATE TABLE orders(
    orderID VARCHAR(300) NOT NULL PRIMARY KEY,
    count INT NOT NULL,
    price INT NOT NULL,
    productID VARCHAR(100) NOT NULL,
    userID VARCHAR(300) NOT NULL,
    isDeleted BIT DEFAULT 0,

    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);


DROP TABLE orders