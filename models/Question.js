const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  expected: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);
