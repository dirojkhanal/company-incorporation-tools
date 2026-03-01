const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const shareholderRoutes = require("./shareholder.routes");

// Company routes
router.get("/",      companyController.getAllCompanies); // GET all (admin)
router.post("/",     companyController.createCompany);   // Create draft (Step 1)
router.get("/:id",   companyController.getCompanyById);  // Get one (resume draft)
router.patch("/:id", companyController.updateCompany);   // Update company

// Mount shareholder routes under /:company_id/shareholders
router.use("/:company_id/shareholders", shareholderRoutes);

module.exports = router;

