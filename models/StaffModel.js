const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a full name..."],
  },
  email: {
    type: String,
  },
}, {
    timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;