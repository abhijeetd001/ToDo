const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleErrors = (err) => {
    console.log("handleErrors ===>>>>", err.message, err.code);
    let errors = { email: '', password: '' };
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
};

// controller actions
module.exports.signup_get = async (req, res) => {
    //   res.render('signup');
    // res.send('signup');
    try {
        const products = await User.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.signup_post = async (req, res) => {
    const { full_name, user_name, phone_number, email, password } = req.body;
    try {
        const user = await User.create({ full_name, user_name, phone_number, email, password });
        // const token = createToken(user._id);
        // const data = { user, token };
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(user);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.userDetailsUpdate = async (req, res) => {
    // const { full_name, user_name, phone_number, email, password } = req.body;
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!user) {
            return res.status(404).json({ message: `cannot find any User with ID ${id}` })
        }
        const updatedUserDetail = await User.findById(id);
        res.status(200).json(updatedUserDetail);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `cannot find any User with ID ${id}` })
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.signin_post = async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const user = await User.findOne({ user_name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = createToken(user._id);
        const data = { user, token };
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(data);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

