const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getSingleCompanyDetails,
} = require("../controllers/Company");
const router = express.Router();

router.route("/").post(createCompany).get(getAllCompanies);
router.route("/:companyId").get(getSingleCompanyDetails);

module.exports = router;
