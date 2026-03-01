const companyService = require("../services/company.service");

const createCompany = async (req, res, next) => {
  try {
    const { name, shareholders_count, total_capital } = req.body;

    if (!name || !shareholders_count || !total_capital) {
      return res.status(400).json({ success: false, message: "name, shareholders_count, and total_capital are required" });
    }
    if (Number(shareholders_count) < 1) {
      return res.status(400).json({ success: false, message: "shareholders_count must be at least 1" });
    }
    if (Number(total_capital) <= 0) {
      return res.status(400).json({ success: false, message: "total_capital must be greater than 0" });
    }

    const company = await companyService.createCompany({
      name,
      shareholders_count: Number(shareholders_count),
      total_capital: Number(total_capital),
    });

    res.status(201).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, shareholders_count, total_capital, status } = req.body;

    if (status && !["draft", "completed"].includes(status)) {
      return res.status(400).json({ success: false, message: "status must be 'draft' or 'completed'" });
    }

    const data = {};
    if (name !== undefined)               data.name = name;
    if (shareholders_count !== undefined) data.shareholders_count = Number(shareholders_count);
    if (total_capital !== undefined)      data.total_capital = Number(total_capital);
    if (status !== undefined)             data.status = status;

    const company = await companyService.updateCompany(id, data);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json({ success: true, data: companies });
  } catch (err) {
    next(err);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCompany, updateCompany, getAllCompanies, getCompanyById };
