const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
require("dotenv").config();
// const connectDB = require("./db/connectDB");

const connectDB = require("./db/connectDB");

const billRouter = require("./routes/Bill");
const customerRouter = require("./routes/Customer");
const companyRouter = require("./routes/Company");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

app.use("/api/v1/bill", billRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/company", companyRouter);

app.get("/", (req, res) => {
  res.json("working");
});

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgCyan.bold);
});
