const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getSingleCustomerDetails,
} = require("../controllers/Customer");
const router = express.Router();

router.route("/").post(createCustomer).get(getAllCustomers);
router.route("/:customerId").get(getSingleCustomerDetails);

module.exports = router;
