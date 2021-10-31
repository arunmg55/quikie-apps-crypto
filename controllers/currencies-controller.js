const axios = require("axios");

const HttpError = require("../models/http-error");
const { NOMICS_API_KEY } = process.env;

const getCryptoDetails = async (req, res, next) => {
  const { page = 1, per_page = 5 } = req.query;
  axios
    .get(
      `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_API_KEY}&interval=1d&per-page=${per_page}&page=${page}`
    )
    .then((resp) => {
      res.status(200).json({
        companies: resp.data || [],
        total: resp.headers["x-pagination-total-items"] || 0,
      });
    })
    .catch((err) => {
      const error = new HttpError(err, 500);
      next(error);
    });
};

exports.getCryptoDetails = getCryptoDetails;
