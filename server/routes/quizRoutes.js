const express = require('express');
const router = express.Router();

// Member 4: Test Endpoint
router.get('/test', (req, res) => {
  res.json({
    member: "Member 4",
    module: "Evaluation, Doubts & Gamification",
    status: "Active"
  });
});

// ශිෂ්‍යයාට ලැබුණු Gamification Badges බැලීම
router.get('/badges/:studentId', (req, res) => {
  res.json({
    studentId: req.params.studentId,
    badges: [
      { id: 1, name: "100% Attendance", icon: "🏆", earnedAt: "2026-10-15" },
      { id: 2, name: "Top Scorer (Maths)", icon: "⭐", earnedAt: "2026-10-25" }
    ]
  });
});

module.exports = router;