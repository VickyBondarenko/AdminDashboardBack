const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;

const productSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const productAddSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  suppliers: Joi.string().required(),
  stock: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
});

const productEditSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  suppliers: Joi.string().required(),
  stock: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
});

const schemas = { productEditSchema, productAddSchema };

productSchema.post("save", handleMongooseError);

const Product = model("product", productSchema);

module.exports = { schemas, Product };
