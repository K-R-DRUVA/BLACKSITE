const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();

const { body, validationResult } = require("express-validator");

// Route 1: Create a user using POST, no login required
router.post(
  "/signup",
  [
    body("username", "Username must be at least 3 characters long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
    body("dob", "Enter a valid date of birth").isISO8601(),
    body("phone", "Phone number must be 10 characters long").isLength({
      min: 10,
    }),
    body("account_type", "Account type is required").notEmpty(),
    body("balance", "Balance must be a number").isNumeric(),
    body("income_amount", "Income amount must be a number").isNumeric(),
    body("income_source", "Income source is required").notEmpty(),
    body("income_description", "Income description is required").notEmpty(),
    body("savings_target", "Savings target must be a number").isNumeric(),
    body("savings_title", "Savings title is required").notEmpty(),
    body(
      "savings_deadline",
      "Savings deadline must be a valid date"
    ).isISO8601(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        username,
        email,
        password,
        dob,
        phone,
        account_type,
        balance,
        income_amount,
        income_source,
        income_description,
        savings_target,
        savings_title,
        savings_deadline,
      } = req.body;

      db.query(
        "SELECT * FROM UserProfile WHERE Name = ? OR Email = ?",
        [username, email],
        async (err, result) => {
          if (result.length > 0) {
            return res.status(400).json({
              error:
                "Username or email is already taken. Please try again with different credentials.",
            });
          }

          const salt = await bcrypt.genSalt();
          const securePass = await bcrypt.hash(password.trim(), salt);

          db.query(
            "INSERT INTO UserProfile (Name, Email, PASSWORD, DOB, Phone) VALUES (?, ?, ?, ?, ?)",
            [username.trim(), email, securePass, dob, phone],
            (err, result) => {
              if (err) throw err;

              const userId = result.insertId;

              db.query(
                "INSERT INTO Account (UserID, Account_Type, Balance) VALUES (?, ?, ?)",
                [userId, account_type, balance],
                (err) => {
                  if (err) throw err;

                  db.query(
                    "INSERT INTO Income (User_ID, Amount, Source_type, Description) VALUES (?, ?, ?, ?)",
                    [userId, income_amount, income_source, income_description],
                    (err) => {
                      if (err) throw err;

                      db.query(
                        "INSERT INTO savings_goal (User_ID, target_amount, current_amount, title, deadline) VALUES (?, ?, 0, ?, ?)",
                        [
                          userId,
                          savings_target,
                          savings_title,
                          savings_deadline,
                        ],
                        (err) => {
                          if (err) throw err;

                          const data = { user: { id: userId } };
                          const authToken = jwt.sign(data, "blacksite");
                          success = true;
                          res.json({ success, authToken });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred while processing your request.");
    }
  }
);

// Route 2: Login a user using POST
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      db.query(
        "SELECT * FROM UserProfile WHERE Email = ?",
        [email],
        async (err, result) => {
          if (result.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
          }

          const user = result[0];
          const passwordCompare = await bcrypt.compare(password, user.Password);

          // Log the password from database
          console.log("Password from database:", user.Password);
          console.log("Password from request:", password);

          if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid email or password" });
          }

          const data = {
            user: {
              id: user.User_ID,
            },
          };

          const authToken = jwt.sign(data, "blacksite");
          res.json({ authToken });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
