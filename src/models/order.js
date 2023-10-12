const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;

const orderSchema = new Schema(
  {
    photo: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    products: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const orderAddSchema = Joi.object({
  photo: Joi.any(),
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  address: Joi.string().required(),
  products: Joi.string().required(),
  price: Joi.string().required(),
  status: Joi.string().required(),
});

const orderEditSchema = Joi.object({
  photo: Joi.any(),
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  address: Joi.string().required(),
  products: Joi.string().required(),
  price: Joi.string().required(),
  status: Joi.string().required(),
});

const schemas = { orderEditSchema, orderAddSchema };

orderSchema.post("save", handleMongooseError);

const Order = model("order", orderSchema);

module.exports = { schemas, Order };
