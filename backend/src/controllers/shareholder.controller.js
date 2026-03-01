const shareholderService = require("../services/shareholder.service");
const companyService = require("../services/company.service");

const createBulkShareholders = async (req, res, next) => {
  try {
    const { company_id } = req.params;
    const { shareholders } = req.body;

    if (!Array.isArray(shareholders) || shareholders.length === 0) {
      return res.status(400).json({ success: false, message: "shareholders must be a non-empty array" });
    }

    const company = await companyService.getCompanyById(company_id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    // Validate each shareholder
    for (let i = 0; i < shareholders.length; i++) {
      const s = shareholders[i];
      if (!s.first_name || !s.last_name || !s.nationality) {
        return res.status(400).json({
          success: false,
          message: `Shareholder ${i + 1} is missing required fields`,
        });
      }
    }

    // Validate count matches Step 1
    if (shareholders.length !== company.shareholders_count) {
      return res.status(400).json({
        success: false,
        message: `Expected ${company.shareholders_count} shareholders but got ${shareholders.length}`,
      });
    }

    const savedShareholders = await shareholderService.createBulkShareholders(company_id, shareholders);

    // Mark company as completed
    const updatedCompany = await companyService.updateCompany(company_id, { status: "completed" });

    res.status(201).json({
      success: true,
      data: { company: updatedCompany, shareholders: savedShareholders },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBulkShareholders };