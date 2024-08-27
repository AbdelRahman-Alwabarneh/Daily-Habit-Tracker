const express = require("express");
const mongoose = require("./Config/config"); // استيراد إعدادات الاتصال بقاعدة البيانات
const users = require("./models/usersModels")
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // استبدل بعنوان النطاق المسموح به
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // السماح بطرق معينة
  allowedHeaders: ['Content-Type', 'Authorization'] // السماح برؤوس معينة
}));

// نقطة النهاية الأساسية
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const userRoutes = require('./routes/usersRoutes');

app.use('/api/user', userRoutes);

const habitRoutes = require('./routes/habitsRoutes');

app.use('/api/habit', habitRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
