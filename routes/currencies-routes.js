const express = require("express");
const router = express.Router();

const currenciesController = require("../controllers/currencies-controller");

router.get("/ticker", currenciesController.getCryptoDetails);

module.exports = router;
