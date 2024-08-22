const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/index");

mongoose.connection.once("open", () => {
  console.log("db connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("connection failed");
});

const connectDb = async () => {
  await mongoose.connect(MONGO_URI);
};

const closeDbConnection = async () => {
  await mongoose.connection.close();
};

module.exports = { connectDb, closeDbConnection };
