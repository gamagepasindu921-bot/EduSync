const express = require('express');
const router = express.Router();

// Member 5: Test Endpoint
router.get('/test', (req, res) => {
  res.json({
    member: "Member 5",
    module: "Parent Portal, Admin & Payroll System",
    status: "Active"
  });
});

// Multi-Child Dashboard: දෙමාපියන්ට දරුවන් කිහිපදෙනාගේ විස්තර එකවර බැලීම
router.get('/children/:parentId', (req, res) => {
  res.json({
    parentId: req.params.parentId,
    parentName: "Sunil Silva",
    children: [
      { studentId: "ST101", name: "Kasun Silva", grade: 11, walletBalance: 2500, attendanceRate: "95%" },
      { studentId: "ST102", name: "Nimali Silva", grade: 9, walletBalance: 1200, attendanceRate: "100%" }
    ]
  });
});

module.exports = router;