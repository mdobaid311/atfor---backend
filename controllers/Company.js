const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");
const Company = require("../models/Company");

const createCompany = async (req, res) => {
  const { password } = req.body;
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    );
    const company = await Company.create(req.body);
    const token = jsonwebtoken.sign(
      {
        id: company._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    res.status(201).json({
      company,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(201).json(companies);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getSingleCompanyDetails = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    console.log(company);
    res.status(201).json(company);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { createCompany, getAllCompanies, getSingleCompanyDetails };
