const { Router } = require('express');
const authController = require('../controllers/SignUpController');

const router = Router();

router.get('/user', authController.signup_get);
router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);
router.put('/user/:id', authController.userDetailsUpdate);
router.delete('/user/:id', authController.deleteUser);

module.exports = router; 