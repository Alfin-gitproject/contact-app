// db.js
const mongoose = require("mongoose");

// Only one function declaration
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Only one export
module.exports = connectDB;
