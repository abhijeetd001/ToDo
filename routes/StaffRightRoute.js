const { Router } = require('express');
const staffController = require('../controllers/StaffControllers');
const rightController = require('../controllers/RightControllers');

const router = Router();

router.post('/staff/create', staffController.createStaff);
router.post('/right/create', rightController.createRight);
router.get('/right/populate', rightController.right_get);

module.exports = router; 