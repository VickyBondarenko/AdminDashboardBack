const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    suppliers: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const supplierAddSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.string().required(),
  status: Joi.string().required(),
});

const supplierEditSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.string().required(),
  status: Joi.string().required(),
});

const schemas = { supplierEditSchema, supplierAddSchema };

supplierSchema.post("save", handleMongooseError);

const Supplier = model("supplier", supplierSchema);

module.exports = { schemas, Supplier };
