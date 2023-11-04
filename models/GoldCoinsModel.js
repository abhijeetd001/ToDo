const mongoose = require('mongoose');

const goldCoinsSchema = new mongoose.Schema({
    number_of_coins: {
        type: Number,
        required: true,
        default: 0
    }
});

const GoldCoins = mongoose.model('goldcoins', goldCoinsSchema);

module.exports = GoldCoins;