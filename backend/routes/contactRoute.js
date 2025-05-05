const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, contactController.getAllContacts);
router.post('/', authMiddleware, contactController.createContact);
router.patch('/:id', authMiddleware, contactController.updateContact);
router.delete('/:id', authMiddleware, contactController.deleteContact);
router.put('/:id', authMiddleware, contactController.updateContact);


module.exports = router;