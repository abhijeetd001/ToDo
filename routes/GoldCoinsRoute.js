const { Router } = require('express');
const coinsController = require('../controllers/GoldCoinsControllers');

const router = Router();

router.get('/getcoins', coinsController.getCoinsData);
router.post('/addcoins', coinsController.addCoinsData);
router.put('/updatecoins/:id', coinsController.updateGoldCoins);
// router.delete('/deleteconins', authController.deleteUser);

module.exports = router; 