const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const incomeExpensSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

incomeExpensSchema.post("save", handleMongooseError);

const IncomeExpens = model("incomeExpens", incomeExpensSchema);

module.exports = { IncomeExpens };
