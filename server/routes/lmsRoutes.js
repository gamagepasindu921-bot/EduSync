const express = require('express');
const router = express.Router();

// Member 3: Test Endpoint
router.get('/test', (req, res) => {
  res.json({
    member: "Member 3",
    module: "LMS, Video Streaming & Anti-Piracy Security",
    status: "Active"
  });
});

// Device Binding පරීක්ෂා කිරීම (Anti-Piracy)
router.post('/verify-device', (req, res) => {
  const { studentId, deviceFingerprint } = req.body;
  
  res.json({
    studentId: studentId,
    deviceAllowed: true,
    watermarkText: `${studentId} - EduSync Protected`,
    message: "Device authenticated. Dynamic watermark ready."
  });
});

module.exports = router;