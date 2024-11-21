const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.get("/recent", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    db.query(
      "SELECT * FROM Expense WHERE User_ID = ? ORDER BY Date DESC LIMIT 5",
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

router.get("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    db.query(
      "SELECT * FROM Expense WHERE User_ID = ? ORDER BY Date DESC",
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
    body("amount", "Amount must be a valid number").isNumeric(),
    body("category", "Category cannot be blank").notEmpty(),
    body("date", "Enter a valid date").isISO8601(),
    body("description", "Description cannot be blank").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, category, date, description } = req.body;

    try {
      const userId = req.user.id;
      db.query(
        "INSERT INTO Expense (Amount, Category, Date, Description, User_ID) VALUES (?, ?, ?, ?, ?)",
        [amount, category, date, description, userId],
        (err, result) => {
          if (err) throw err;
          res.json({ message: "Transaction added successfully" });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
