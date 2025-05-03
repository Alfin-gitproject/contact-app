const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async ({ name, email, phone, address, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const user = new User({ name, email, phone, address, password });
    await user.save();
    console.log('User saved:', user);
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    console.log('Login attempt for email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated for user:', user._id);
    return { token, user: { _id: user._id, name: user.name, email: user.email } };
  } catch (error) {
    console.error('Login user error:', error.message);
    throw error;
  }
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { createUser, loginUser, getUserById };