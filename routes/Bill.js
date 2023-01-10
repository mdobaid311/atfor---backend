const express = require("express");
const {
  createBill,
  updateBill,
  getBillsOfClient,
  getBillsOfCompany,
} = require("../controllers/Bill");

const router = express.Router();

router.route("/").post(createBill);

router.route("/:billId").patch(updateBill);

router.route("/customer/:customerId").get(getBillsOfClient);
router.route("/company/:companyId").get(getBillsOfCompany);

module.exports = router;
