const express = require("express");
const router = express.Router();

// controllers //

const CompanyController = require("../../controllers/CompanyController");

const addCompanyGroup = "/api/company";
router.get(addCompanyGroup + "/companies", CompanyController.getCompany);
module.exports = router;
