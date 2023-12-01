import Router from "express";

import { verifyToken } from "../middlewares/verifytoken";
import { addProduct, deleteOrder, getOrder, getallorders, updateOrders } from "../controllers/cartcontroller";

const order_router = Router();

order_router.get("/allorders", verifyToken, getallorders);
order_router.post("/add", addProduct);
order_router.get("/oneorder/:ID", getOrder);
order_router.put("/updateorder", updateOrders);
order_router.delete("/deleteorder/:ID", deleteOrder);

export default order_router;
