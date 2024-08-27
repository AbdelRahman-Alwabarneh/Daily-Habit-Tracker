// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');

// تعريف مسار لإدراج المستخدم
router.post('/addusers', userController.createUser);

module.exports = router;
