const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams lets us access :company_id from parent
const shareholderController = require("../controllers/shareholder.controller");

// POST /api/companies/:company_id/shareholders/bulk
router.post("/bulk", shareholderController.createBulkShareholders);

module.exports = router;