const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const companiesRoutes = require("./routes/companies-routes");
const currenciesRoutes = require("./routes/currencies-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(cors());
app.options("*", cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!");
});

app.use(express.json());

app.use("/api/companies", companiesRoutes);

app.use("/api/currencies", currenciesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find the route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
