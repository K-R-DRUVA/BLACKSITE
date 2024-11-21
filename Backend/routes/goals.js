const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var fetchUser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");

router.get("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    db.query(
      "SELECT * FROM savings_goal WHERE User_ID = ?",
      [userId],
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.post(
  "/add",
  fetchUser,
  [
    body("target_amount", "Target amount must be a valid number").isNumeric(),
    body("title", "Title cannot be blank").notEmpty(),
    body("deadline", "Enter a valid date").isISO8601(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { target_amount, title, deadline } = req.body;

    try {
      const userId = req.user.id;
      db.query(
        "INSERT INTO savings_goal (target_amount, current_amount, title, deadline, User_ID) VALUES (?, 0, ?, ?, ?)",
        [target_amount, title, deadline, userId],
        (err, result) => {
          if (err) throw err;
          res.json({ message: "Goal added successfully" });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
