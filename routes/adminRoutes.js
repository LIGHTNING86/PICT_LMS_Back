const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAdmins);
router.get('/:_id', adminController.getAdminById); // Ensure consistency with parameter name
router.put('/:_id', adminController.updateAdmin);

module.exports = router;
