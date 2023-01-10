const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(url, () => {
    console.log("MongoDB connected".bgYellow.bold);
  });
};

module.exports = connectDB;
