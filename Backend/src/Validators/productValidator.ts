import joi from "joi";

export const validateProduct = joi.object().keys({
  title: joi.string().required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  image: joi.string().required(),
  category: joi.string().required(),
  description: joi.string().min(5).required(),
});

export const validateUpdateProduct = joi.object().keys({
  title: joi.string().required(),
  productID: joi.string().min(8).required(),
  price: joi.number().required(),
  image: joi.string().required(),
  category: joi.string().required(),
  description: joi.string().min(5).required(),
  stock: joi.number().required(),
});

export const validateProductId = joi.object().keys({
  productID: joi.string().min(8).required(),
});
