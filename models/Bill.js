const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: [true, "Customer information is required"],
  },
  company: {
    type: mongoose.Types.ObjectId,
    required: [true, "Customer information is required"],
  },
  bill_amount: {
    type: Number,
    default: 0,
    required: [true, "Bill amount is required"],
  },
  bill_taxes: {
    type: [
      {
        tax_name: { type: String },
        tax_amount: { type: Number },
        tax_percent: { type: Number, min: 0, max: 100 },
      },
    ],
  },
  bill_total: {
    type: Number,
    required: [true, "Bill total information is required"],
    default: 0,
  },
  amount_paid: {
    type: Number,
    required: [true, "Amount paid information is required"],
    default: 0,
  },
  amount_pending: {
    type: Number,
    default: 0,
  },
  discount_amount: {
    type: Number,
  },
  discount_percent: {
    type: Number,
    min: 0,
    max: 100,
  },
  pay_amount: {
    type: Number,
  },
  cashback: {
    type: Number,
  },
});

module.exports = mongoose.model("Bill", BillSchema);
