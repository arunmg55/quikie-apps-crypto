const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companies-controller");

router.get("/", companiesController.getSavedCompanies);

router.post("/", companiesController.saveCompanyInformation);

router.delete("/:cid", companiesController.deleteSavedCompany);

module.exports = router;
