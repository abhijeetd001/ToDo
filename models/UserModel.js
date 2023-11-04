const mongoose = require('mongoose');
const { isEmail } = require('validator');
// bcrypt is a library used for hashing passwords and provides a secure way to store and compare hashed passwords.
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [false, "Please enter a full name..."],
  },
  phone_number: {
    type: Number,
    required: true,
    default: 0
  },
  user_name: {
    type: String,
    required: [true, "Please enter a user name..."],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [false, "Please enter a email address..."],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Please enter a password..."],
    minlength: [8, "Minimum lenght of password is 8 Characters"],
  },
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved ==>>>>', doc);
  next();
});

// fire a function before doc saved to db
//* For hashing password concept, Follow ==>>>> https://youtu.be/DmrjFKTLOYo?si=05hWStJkwzL5lAz5
userSchema.pre('save', async function (next) {
  console.log('user about to be created & saved ==>>>>', this);
  const salt = await bcrypt.genSalt();   // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt);  // Hash the user's password using the generated salt
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;