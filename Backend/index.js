const connectToSQL = require("./db");
const express = require("express");
const cors = require("cors");

connectToSQL();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/goals", require("./routes/goals"));
app.use("/api/dashboard", require("./routes/dashboard"));

app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

app.listen(5000, () => {
  console.log(`blacksite-backend listening on port 5000`);
});

module.exports = app;
