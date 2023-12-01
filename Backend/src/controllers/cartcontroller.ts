import { Request, Response } from "express";
import mssql from "mssql";
import { addProductValidation, updateOrderValidation, validateOrderID } from "../Validators/cartValidator";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";
import { ExtendedUser } from "../middlewares/verifytoken";
import { Order } from "../interface/order";

//add to cart
export const addProduct = async (req: Request, res: Response) => {
  try {
    let { userID, productID, price, count } = req.body;

    console.log(req.body);

    const { error } = addProductValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let orderID = v4();
    const procedureName2 = "createneworder";
    const params = {
      productID,
      userID,
      price,
      count,
      orderID,
    };

    await execute(procedureName2, params);

    res.status(200).json({
      message: "order added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GET ALL ORDERS
export const getallorders = async (req: ExtendedUser, res: Response) => {
  try {
    const procedureName = "getAllOrders";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

//GET ONE BOOKING
export const getOrder = async (req: Request, res: Response) => {
  try {
    const orderID = req.params.ID;
    //console.log(orderID);

    if (!orderID) return res.status(400).send({ error: "Id is required" });

    const { error } = validateOrderID.validate({ orderID });
    console.log(error);

    if (error) return res.status(400).send({ error: error.details[0].message });
    console.log("hello");

    const procedureName = "getOrderById";
    const result = await execute(procedureName, { orderID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

//UPDATE BOOKING
export const updateOrders = async (req: Request, res: Response) => {
  try {
    const { orderID, count, price, userID, productID } = req.body;
    console.log(req.body);

    const { error } = updateOrderValidation.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newOrder: Order = {
      productID,
      count,
      price,
      userID,
      orderID
    };

    const ProcedureName = "updateOrder";
    const params = newOrder;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Order updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};

//delete from cart
export const deleteOrder = async (req: Request, res: Response) => {
  try {
      const orderID = req.params.ID;
    //   console.log(orderID);
      

    if (!orderID) {
      return res.send({ message: "enter id" });
    }
    console.log(`order id is:${orderID}`);

    const result = await execute("deleteOrder", { orderID });

    console.log(result.recordset);

    res.send({ message: "Order deleted successfuly" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

