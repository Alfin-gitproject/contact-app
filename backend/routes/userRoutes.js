const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;