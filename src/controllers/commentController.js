const Comment = require('../models/Comment');
const createErrorObject = require('../helpers/responses/createErrorObject');
const handleResponse = require('../helpers/responses/handleResponse');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { text, userId, likes } = req.body;
    const comment = new Comment({ text, userId, likes });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get all comments for a place
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, likes } = req.body;
    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndRemove(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};
