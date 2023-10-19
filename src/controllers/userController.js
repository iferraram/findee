const User = require('../models/User');
const createErrorObject = require('../helpers/responses/createErrorObject');
const handleResponse = require('../helpers/responses/handleResponse');



// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;
    const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};
