const GoldCoins = require("../models/GoldCoinsModel");

// controller actions
module.exports.getCoinsData = async (req, res) => {
    try {
        const todoList = await GoldCoins.find({});
        res.status(200).json(todoList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.addCoinsData = async (req, res) => {
    const { number_of_coins } = req.body;
    try {
        const data = await GoldCoins.create({ number_of_coins });
        res.status(201).json(data);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        res.status(400).json({ err });
    }
}

module.exports.updateGoldCoins = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🚀 ~ file: GoldCoinsControllers.js:28 ~ module.exports.updateGoldCoins= ~ id:", id)
        const goldCoinItem = await GoldCoins.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!goldCoinItem) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        const updatedGoldCoinsData = await GoldCoins.findById(id);
        res.status(200).json(updatedGoldCoinsData);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// module.exports.deleteToDoTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await ToDoList.findByIdAndDelete(id);
//         if (!user) {
//             return res.status(404).json({ message: `cannot find any User with ID ${id}` })
//         }
//         res.status(200).send("Item has been deleted...");

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }





