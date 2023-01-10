const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  mobile_number: {
    type: Number,
    required: [true, "Please enter mobile number"],
  },
  address: {
    type: String
  },
  occupation: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);


// {
//   home_number: String,
//   street: String,
//   city: String,
//   state: String,
//   country: String,
//   pin_code: Number,
// },