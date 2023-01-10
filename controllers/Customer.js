const CryptoJS = require("crypto-js");
const Customer = require("../models/Customer");
const jsonwebtoken = require("jsonwebtoken");

const createCustomer = async (req, res) => {
  const { password } = req.body;
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    );
    const customer = await Customer.create(req.body);
    const token = jsonwebtoken.sign(
      {
        id: customer._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    res.status(201).json({
      customer,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(201).json(customers);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getSingleCustomerDetails = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findById(customerId);
    console.log(customer);
    res.status(201).json(customer);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { createCustomer, getAllCustomers, getSingleCustomerDetails };
