const bcrypt = require('bcrypt')

const saltRounds =10;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Login Service
const loginUser = async (email, password) => {
    // check if user is found by email address
    const user = await User.findOne({ email: email});
    if (!user) {
                throw new Error('Account not found');
    }
    // check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Incorrect password');
    }
    // Generate JWT token
    const token = jwt.sign({user_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
    //Return the token
    return {token};
};

// register service
const registerUser = async (userData) => {
    // destruct all necessary values
    const { first_name, last_name, email, password} = userData;
    //check if user already exists
    const user = await User.findOne({ email: email});
    if (user) {
        throw new Error('Account already exists');
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create new user
    const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
    });
    // save new user
    const savedUser = await newUser.save();
    return savedUser;
}

module.exports = {
    loginUser,
    registerUser
};