import joi from "joi";

export const addProductValidation = joi.object().keys({
  productID: joi.string().required(),
  userID: joi.string().required(),
  count: joi.number().min(1).required(),
  price: joi.number().required(),
});

export const validateOrderID = joi.object().keys({
  orderID: joi.string().min(8).required(),
});

export const updateOrderValidation = joi.object().keys({
  productID: joi.string().required(),
  userID: joi.string().required(),
  count: joi.number().min(1).required(),
  price: joi.number().required(),
  orderID: joi.string().required()
});