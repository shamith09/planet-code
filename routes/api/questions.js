const express = require("express");
const router = express.Router();

const Question = require("../../models/Question");

router.get("/get-questions", (req, res) => {
  Question.find((err, data) => {
    res.send(JSON.stringify(data));
  });
});

module.exports = router;
