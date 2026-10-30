const express = require('express');
const router = express.Router();

// 1. Member 1 - Wallet System Test Endpoint
router.get('/test', (req, res) => {
  res.json({
    module: "Financial & Wallet Engine",
    status: "Active",
    features: [
      "Virtual Wallet Balance",
      "Online Top-up (PayHere/Stripe)",
      "Instant NFC Fee Deduction",
      "Automated Teacher Revenue Splitting"
    ]
  });
});

// 2. Sample Wallet Balance Check Endpoint (Mock API)
router.get('/balance/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  
  // සාම්පල් mock data එකක් (පසුව Database එකට connect කරමු)
  res.json({
    studentId: studentId,
    studentName: "Kasun Perera",
    walletBalance: 2500.00,
    currency: "LKR",
    lastUpdated: new Date().toISOString()
  });
});

module.exports = router;