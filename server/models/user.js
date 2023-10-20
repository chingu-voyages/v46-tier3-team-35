const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ensures uniqueness
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures uniqueness
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail, // using validator's isEmail method
      message: "is invalid",
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
