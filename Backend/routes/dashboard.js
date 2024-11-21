const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchuser");
const util = require("util");
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get("/", fetchUser, async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const query = util.promisify(db.query).bind(db);

  try {
    const [recentTransactions, spendingData, monthlySpendingData, summaryData] =
      await Promise.all([
        // Recent Transactions
        query(
          `SELECT 
            e.Description AS description,
            e.Amount AS amount,
            e.Date AS date
          FROM Expense e
          WHERE e.User_ID = ?
          ORDER BY e.Date DESC
          LIMIT 5`,
          [userId]
        ),

        // Category-wise Spending
        query(
          `SELECT 
            e.Category AS category,
            SUM(e.Amount) AS amount
          FROM Expense e
          WHERE e.User_ID = ?
          GROUP BY e.Category`,
          [userId]
        ),

        // Monthly Spending
        query(
          `SELECT 
            DATE_FORMAT(e.Date, '%b %Y') AS name,
            SUM(e.Amount) AS amount
          FROM Expense e
          WHERE e.User_ID = ?
          GROUP BY DATE_FORMAT(e.Date, '%b %Y')
          ORDER BY MIN(e.Date) ASC
          LIMIT 6`,
          [userId]
        ),

        // Summary Data
        query(
          `SELECT
            (SELECT SUM(i.Amount) FROM Income i WHERE i.User_ID = ?) AS total_income,
            (SELECT SUM(e.Amount) FROM Expense e WHERE e.User_ID = ?) AS total_expenses,
            (SELECT Balance FROM Account a WHERE a.USERID = ?) AS total_balance,
            (SELECT SUM(s.current_amount) FROM savings_goal s WHERE s.User_ID = ?) AS total_savings`,
          [userId, userId, userId, userId]
        ),
      ]);

    res.json({
      recentTransactions,
      spendingData,
      monthlySpendingData,
      summary: {
        totalIncome: summaryData[0]?.total_income ?? 0,
        totalExpenses: summaryData[0]?.total_expenses ?? 0,
        totalBalance: summaryData[0]?.total_balance ?? 0,
        totalSavings: summaryData[0]?.total_savings ?? 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

module.exports = router;
