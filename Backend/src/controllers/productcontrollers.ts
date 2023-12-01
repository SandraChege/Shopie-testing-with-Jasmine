import { Request, Response } from "express";
import { validateProduct, validateProductId, validateUpdateProduct } from "../Validators/productValidator";
import { execute, query } from "../helpers/dbHelper";
import { Product } from "../interface/product";
import { v4 } from "uuid";

//CREATE PRODUCTS
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, image, category, description, stock } = req.body;

    // console.log(req.body);

    const { error } = validateProduct.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newProduct: Product = {
      productID: v4(),
      title,
      price,
      image,
      category,
      description,
      stock,
    };

    const procedure = "createProduct";
    const params = newProduct;

    await execute(procedure, params);
    return res.send({ message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
//GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const procedureName = "getProducts";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
//UPDATE PRODUCTS
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productID, title, price, image, category, description, stock } = req.body;
    console.log(req.body);

    const { error } = validateUpdateProduct.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Product = {
      productID,
      title,
      price,
      image,
      category,
      description,
      stock,
    };

    const ProcedureName = "updateProduct";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
//DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productID = req.params.ID;
    if (!productID) return res.status(400).send({ error: "Id is required" });

      const { error } = validateProductId.validate({ productID });

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deleteProduct";
    await execute(procedureName, { productID });

    res.status(201).send({ message: "product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};
//GET SINGLE PRODUCTS
export const getProduct = async (req: Request, res: Response) => {
  try {
      const productID = req.params.ID;
      console.log(productID);
      
    if (!productID) return res.status(400).send({ error: "Id is required" });

      const { error } = validateProductId.validate({productID});
      console.log(error);

      if (error) return res.status(400).send({ error: error.details[0].message });
      console.log("hello");

    const procedureName = "getProductById";
    const result = await execute(procedureName, { productID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

