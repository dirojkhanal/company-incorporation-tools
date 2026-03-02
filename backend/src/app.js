const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/company.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Company Incorporation API is running ✅" });
});

app.use("/api/companies", companyRoutes);

app.use(errorHandler);

module.exports = app;