const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const shareholderController = require("../controllers/shareholder.controller");

router.get("/",     companyController.getAllCompanies);   // GET all (admin)
router.post("/",    companyController.createCompany);     // Create draft (Step 1)
router.get("/:id",  companyController.getCompanyById);    // Get one (resume draft)
router.patch("/:id", companyController.updateCompany);    // Update company

router.post("/:company_id/shareholders/bulk", shareholderController.createBulkShareholders); // Step 2

module.exports = router;