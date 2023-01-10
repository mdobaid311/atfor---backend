const mongoose = require("mongoose");
const Bill = require("../models/Bill");

const getBillsOfClient = async (req, res) => {
  const { customerId } = req.params;
  try {
    const bills = await Bill.find({
      customer: customerId,
    });
    res.status(201).json({ bills });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};



const getBillsOfCompany = async (req, res) => {
  const { companyId } = req.params;
  try {
    const bills = await Bill.find({
      company: companyId,
    });
    res.status(201).json({ bills });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const createBill = async (req, res) => {
  try {
    const {
      bill_amount,
      bill_taxes,
      amount_paid,
      discount_amount,
      discount_percent,
    } = req.body;

    let bill_total = bill_amount;

    if (bill_taxes) {
      console.log(bill_taxes);
      bill_taxes.forEach((bill_tax) => {
        const { tax_amount, tax_percent } = bill_tax;
        if (tax_amount) {
          bill_total = bill_total + tax_amount;
        }
        if (tax_percent) {
          bill_total = bill_total + bill_amount * (tax_percent * 0.01);
        }
      });

      if (discount_amount) {
        bill_total = bill_total - discount_amount;
      }
      if (discount_percent) {
        bill_total = bill_total - bill_total * (discount_percent * 0.01);
      }
    }

    let amount_pending = bill_total - amount_paid;

    const bill = await Bill.create({ ...req.body, bill_total, amount_pending });
    res.status(201).json(bill);
  } catch (error) {
    res.status(401).json(error);
  }
};

const updateBill = async (req, res) => {
  const { billId } = req.params;
  let { pay_amount } = req.body;
  try {
    let old_bill = await Bill.findById(billId);
    // console.log(old_bill)
    let { amount_paid, amount_pending } = old_bill;
    if (amount_pending <= 0) {
      res.status(201).json({ message: "Bill already full paid" });
    }
    amount_paid = amount_paid + pay_amount;
    let cashback = 0;
    if (pay_amount > amount_pending) {
      cashback = pay_amount - amount_pending;
      pay_amount = amount_pending;
    }
    amount_pending = amount_pending - pay_amount;
    const new_bill = {
      ...old_bill._doc,
      amount_paid,
      amount_pending,
      cashback,
    };
    const bill = await Bill.findByIdAndUpdate(billId, new_bill);
    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

module.exports = { createBill, updateBill, getBillsOfClient,getBillsOfCompany };
