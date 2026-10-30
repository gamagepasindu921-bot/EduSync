// 1. Libraries Import
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 2. සාමාජිකයන් 5 දෙනාගේ Routes Import කරගැනීම
const walletRoutes = require('./routes/walletRoutes');         // Member 1
const attendanceRoutes = require('./routes/attendanceRoutes'); // Member 2
const lmsRoutes = require('./routes/lmsRoutes');               // Member 3
const quizRoutes = require('./routes/quizRoutes');             // Member 4
const parentRoutes = require('./routes/parentRoutes');         // Member 5

// 3. Express App Setup
const app = express();
const PORT = process.env.PORT || 5001;

// 4. Middlewares
app.use(cors());
app.use(express.json());

// 5. API Endpoints 
app.use('/api/wallet', walletRoutes);         // Member 1 Base URL
app.use('/api/attendance', attendanceRoutes); // Member 2 Base URL
app.use('/api/lms', lmsRoutes);               // Member 3 Base URL
app.use('/api/quiz', quizRoutes);             // Member 4 Base URL
app.use('/api/parent', parentRoutes);         // Member 5 Base URL

// 6. Root Health Check Route
app.get('/', (req, res) => {
  res.json({ 
    message: "🚀 EduSync API Gateway is running smoothly!", 
    status: "Active",
    modulesReady: 5
  });
});

// 7. Server Start
app.listen(PORT, () => {
  console.log(`🚀 EduSync Server is running on http://localhost:${PORT}`);
});