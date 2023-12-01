import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productcontrollers";

jest.mock("../helpers/dbHelper", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("Product Controller Tests", () => {
  it("should create a new product", async () => {
    const req = {
      body: {
        title: "Sample Product",
        price: 100,
        image: "image.jpg",
        category: "category",
        description: "Sample description",
        stock: 10,
      },
    } as any;

    const res = {
      send: jest.fn(),
    } as any;

    await createProduct(req, res);
    expect(execute).toHaveBeenCalledWith("createProduct", expect.any(Object));
    expect(res.send).toHaveBeenCalledWith({
      message: "product created successfully",
    });
  });

  it("handles validation error", async () => {
    const req = {
      body: {
        // Missing required fields
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "please place correct details",
    });
  });

  it("gets all products successfully", async () => {
    const mockedProducts = [
      {
        productID: "abdc-11122-vjhbv",
        title: "Red Label",
        description: "Buy red label",
        price: 1000,
        image: "red-label-image.jpg",
        stock: 6,
      },
      {
        productID: "abdc-11122-vjhbv",
        title: "Red Label",
        description: "Buy red label",
        price: 1000,
        image: "red-label-image.jpg",
        stock: 6,
      },
    ];
    (query as jest.Mock).mockResolvedValueOnce({ recordset: mockedProducts });

    const req = {} as Request;

    const res = {
      json: jest.fn(),
    } as any;

    await getProducts(req, res);

    expect(query).toHaveBeenCalledWith("EXEC getProducts");
    expect(res.json).toHaveBeenCalledWith(mockedProducts);
  });
});
