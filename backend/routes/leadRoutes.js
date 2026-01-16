const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// GET /api/leads
router.get("/", async (req, res) => {
  const { search, status, sort = "createdAt", page = 1, limit = 10 } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ];
  }

  if (status) query.status = status;
  
  if (req.query.source) query.source = req.query.source;

  const skip = (page - 1) * limit;
  
  // Handle sort direction
  const sortDirection = req.query.order === "asc" ? 1 : -1;

  const leads = await Lead.find(query)
    .sort({ [sort]: sortDirection })
    .skip(skip)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  res.json({ total, leads });
});

// GET /api/leads/analytics/stats (must be before /:id route)
router.get("/analytics/stats", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: "Converted" });
    
    const leadsByStage = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const leadsBySource = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 }
        }
      }
    ]);

    const stageMap = {};
    leadsByStage.forEach(item => {
      stageMap[item._id] = item.count;
    });

    res.json({
      totalLeads,
      convertedLeads,
      conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0,
      leadsByStage: {
        New: stageMap["New"] || 0,
        Contacted: stageMap["Contacted"] || 0,
        Converted: stageMap["Converted"] || 0,
      },
      leadsBySource: leadsBySource.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/leads/:id (must be after /analytics/stats route)
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
