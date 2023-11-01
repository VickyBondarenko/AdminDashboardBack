const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;

const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.]+(\.[a-zA-Z]+){1,2}$/;

const customerSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    image: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    spent: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const customerAddSchema = Joi.object({
  email: Joi.string()
    .min(7)
    .max(35)
    .regex(emailRegex)
    .email({ maxDomainSegments: 3, tlds: { deny: ["ru"] } })
    .required()
    .messages({
      "string.pattern.base":
        "min 7, max 35, only alphanum, `.`, `_`, `-` allowed",
      "any.required": "email is required",
    }),
  image: Joi.any(),
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
  spent: Joi.string().required(),
});

const customerUpdateSchema = Joi.object({
  image: Joi.any(),
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters, no spaces, no spec.symbols",
  }),
});

const schemas = { customerUpdateSchema, customerAddSchema };

customerSchema.post("save", handleMongooseError);

const Customer = model("customer", customerSchema);

module.exports = { schemas, Customer };
