const StaffList = require("../models/StaffModel");

module.exports.createStaff = async (req, res) => {
    const { name, email } = req.body;
    try {
        const data = await StaffList.create({ name, email });
        res.status(201).json(data);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        res.status(400).json({ err });
    }
}