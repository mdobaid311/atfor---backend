const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  company_email: {
    type: String,
    required: [true, "Please enter last name"],
  },

  company_mobile_number: {
    type: Number,
    required: [true, "Please enter mobile number"],
  },
  address: {
    type: String,
  },
  business_structure: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
});

module.exports = mongoose.model("Company", CompanySchema);

// type: {
//   home_number: String,
//   street: String,
//   city: String,
//   state: String,
//   country: String,
//   pin_code: Number,
// },
