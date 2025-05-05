const userService = require('../services/userService');
const validator = require('validator');


const createUser = async (req, res) => {
  try {

    const { email } = req.body;

    // Use validator to check email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        createdAt: user?.createdAt,
      },
    });
  } catch (error) {
    console.error('Create user error:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    
    res.json({
      success: true,
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Login user error:', error.message);
    res.status(401).json({ 
      success: false,
      message: error.message 
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Get current user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { createUser, loginUser, getCurrentUser };