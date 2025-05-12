const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        // Must be exactly 10 digits starting with 6,7,8,9
        return /^[6-9]\d{9}$/.test(v) && v.length === 10;
      },
      message: (props) => `${props.value} Please enter a valid number!`,
    },
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be exactly 10 digits"],
    maxlength: [10, "Phone number must be exactly 10 digits"],
  },
  address: { type: String, trim: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    validate: {
      validator: function (v) {
        const hasUpperCase = /[A-Z]/.test(v);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v);
        return hasUpperCase && hasSpecialChar;
      },
      message:
        "Password must contain at least one capital letter and one special character",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
