const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

// Create Schema
const UserSchema = new Schema({
  id: {
    type: String,
    default: uuid.v4()
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  questions: {
    type: Array,
    default: ["0"],
    required: true
  },
  points: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
