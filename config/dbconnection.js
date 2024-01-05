//external imports--
const mongoose = require("mongoose");

//function for database connection--
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("database connected successfully...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbconnect;
