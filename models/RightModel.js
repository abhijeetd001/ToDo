const mongoose = require('mongoose');

const rightSchema = new mongoose.Schema({
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff"
  },
  right: {
    type: String, 
  },
}, {
    timestamps: true
});

const Right = mongoose.model('Right', rightSchema);

module.exports = Right;