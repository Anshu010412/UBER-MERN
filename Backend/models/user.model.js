const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "first name must be at least 3 character minimum"],
    },
    lastName: {
      type: String,
      minLength: [3, "last name must be at least 3 character minimum"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 character minimum"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketid: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
