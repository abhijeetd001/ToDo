const RightList = require("../models/RightModel");

module.exports.right_get = async (req, res) => {
    const { right_id } = req.body;
    try {
        const rights = await RightList.find({ _id: right_id }).populate("staff_id");
        res.status(200).json(rights);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.createRight = async (req, res) => {
    const { staff_id, right } = req.body;
    try {
        const data = await RightList.create({ staff_id, right });
        const rightData = await data.save();
        res.status(201).json(rightData);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        res.status(400).json({ err });
    }
}