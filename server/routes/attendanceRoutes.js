const express = require('express');
const router = express.Router();

// Member 2: Test Endpoint
router.get('/test', (req, res) => {
  res.json({
    member: "Member 2",
    module: "NFC Hardware, Attendance & Alerts",
    status: "Active"
  });
});

// NFC හෝ Fallback QR මඟින් Attendance mark කරන Endpoint එක (Mock API)
router.post('/tap', (req, res) => {
  const { studentId, method, classId } = req.body; // method: "NFC" or "QR"
  
  res.json({
    success: true,
    message: `Attendance marked successfully via ${method || 'NFC'}!`,
    studentId: studentId || "ST101",
    timestamp: new Date().toLocaleTimeString(),
    feeDeductionTriggered: true
  });
});

module.exports = router;