const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
