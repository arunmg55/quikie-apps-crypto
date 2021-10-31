const HttpError = require("../models/http-error");

const Company = require("../models/company");

const getSavedCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find({}).sort({ _id: -1 });
    res.status(200).json({ companies });
  } catch (err) {
    const error = new HttpError(err, 500);
    next(error);
  }
};

const saveCompanyInformation = async (req, res, next) => {
  try {
    const { symbol, name, price, market_cap, currency } = req.body;
    const savedCompany = await Company.findOne({
      symbol,
      name,
    });

    if (savedCompany) {
      return res
        .status(422)
        .json({ message: "Company information already saved." });
    }
    const companyInfo = new Company({
      symbol,
      name,
      price,
      market_cap,
      currency,
    });
    await companyInfo.save();
    res.status(201).json({ message: "Company information saved." });
  } catch (err) {
    const error = new HttpError(err, 500);
    next(error);
  }
};

const deleteSavedCompany = async (req, res, next) => {
  try {
    const companyId = req.params.cid;
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res
        .status(422)
        .json({ message: "Could not find the company for provided id" });
    }
    res.status(200).json({ message: "Deleted the saved information" });
  } catch (err) {
    const error = new HttpError(err, 500);
    next(error);
  }
};

exports.getSavedCompanies = getSavedCompanies;
exports.saveCompanyInformation = saveCompanyInformation;
exports.deleteSavedCompany = deleteSavedCompany;
