import { NextFunction, Request, Response, json, urlencoded } from "express";
import express from "express";
import dotenv from "dotenv";
import user_router from "./Routes/userRoutes";
import cors from "cors";
import product_router from "./Routes/productRoutes";
import order_router from "./Routes/orderRoutes";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/user", user_router);
app.use("/product", product_router);
app.use("/order", order_router);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Shopie is running on port ${port}`);
});
