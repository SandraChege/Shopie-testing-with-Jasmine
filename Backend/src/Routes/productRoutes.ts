import Router from "express";

import { verifyToken } from "../middlewares/verifytoken";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productcontrollers";

const product_router = Router();

// user_router.get("/getallusers", verifyToken, getAllUsers);
product_router.post("/add", createProduct);
product_router.get("/getallproducts", verifyToken, getProducts)
product_router.put("/updateproduct", updateProduct)
product_router.get("/getoneproduct/:ID", getProduct);
product_router.delete("/deleteproduct/:ID", deleteProduct);


export default product_router;
