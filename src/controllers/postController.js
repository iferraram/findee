const Post = require("../models/Post");
const User = require("../models/User");
const createErrorObject = require("../helpers/responses/createErrorObject");
const handleResponse = require("../helpers/responses/handleResponse");
const handlePagination = require("../helpers/responses/handlePagination");

// Create a new event

exports.createPost = async (req, res) => {
  try {
    const {
      name,
      description,
      place,
      event_time,
      organizer,
      price,
      rsvp,
      category,
      mood,
      popularity,
      rating,
      grouping_preference,
      activity_objective,
      atmosphere,
      media,
      comments,
      capacity,
      post_type,
    } = req.body;

    const post = new Post({
      name,
      description,
      place,
      event: {
        capacity,
        event_time,
        organizers: organizer, // Assuming 'organizer' is an array of User ObjectId
        rsvp,
      },
      cost: price,
      category,
      mood,
      popularity,
      rating,
      grouping_preference,
      activity_objective,
      atmosphere,
      media,
      comments,
      capacity,
      post_type,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get all events
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get a specific event by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Update an event by ID

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      place,
      event_time,
      would_recommend,
      owner,
      organizer,
      price,
      rsvp,
      category,
      media,
      questions,
      comments,
      attendance,
      timeZone,
      grade,
      mood,
      type,
      googleId,
      post_type,
    } = req.body;

    const updatedPostData = {
      name,
      description,
      place,
      event: {
        event_time,
        organizers: organizer, // Assuming 'organizer' is an array of User ObjectId
        rsvp,
      },
      would_recommend,
      owner,
      price,
      category,
      media,
      questions,
      comments,
      attendance,
      timeZone,
      grade,
      mood,
      type,
      googleId,
      post_type,
    };

    const post = await Post.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Delete an event by ID
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndRemove(id);
    if (!post) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// get events by categories
exports.getAllPostsByCategories = async (req, res) => {
  try {
    const {
      category,
      rating,
      price,
      page = 1,
      pageSize = 10,
      event_time,
      start_time,
      end_time,
      post_type,
      capacity,
      created_at,
    } = req.query;

    let query = {
      category,
      rating,
      price,
      capacity,
      pageSize,
      page,
      created_at,
      event_time,
      start_time,
      end_time,
      post_type,
    };
    query = JSON.parse(JSON.stringify(query));

    const resPaginated = await handlePagination(Post, req, res, query);
    console.log(resPaginated);
    res.status(200).json(resPaginated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get the users id following
// get all post from the following
exports.getPostsByFollowing = async (req, res) => {
  try {
    const {
      category,
      rating,
      price,
      page = 1,
      pageSize = 5,
      event_time,
      start_time,
      end_time,
      post_type,
      capacity,
      created_at,
      created_by,
    } = req.query;

    const user = await User.findById(created_by);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the IDs of users that the current user is following
    const followingIds = user.following;

    // Build the match conditions based on query parameters
    const matchConditions = {
      created_by: { $in: followingIds },
    };

    if (category) {
      matchConditions.category = mongoose.Types.ObjectId(category);
    }

    if (rating) {
      matchConditions.rating = parseInt(rating);
    }

    if (price) {
      matchConditions.price = { $lte: parseInt(price) };
    }

    if (event_time) {
      matchConditions.event_time = { $gte: new Date(event_time) };
    }

    if (start_time) {
      matchConditions.start_time = { $gte: new Date(start_time) };
    }

    if (end_time) {
      matchConditions.end_time = { $lte: new Date(end_time) };
    }

    if (post_type) {
      matchConditions.post_type = post_type;
    }

    if (capacity) {
      matchConditions.capacity = parseInt(capacity);
    }

    if (created_at) {
      matchConditions.createdAt = { $gte: new Date(created_at) };
    }

    // Find posts from users the current user is following with additional filtering
    const followingPosts = await Post.aggregate([
      {
        $match: matchConditions,
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: parseInt(pageSize) },
    ]);

    res.status(200).json(followingPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get the users id following
// get all post from the following
exports.getPostsByUserId = async (req, res) => {
  try {
    const {
      category,
      rating,
      price,
      page = 1,
      pageSize = 5,
      event_time,
      start_time,
      end_time,
      post_type,
      capacity,
      created_at,
      created_by,
    } = req.query;

    const user = await User.findById(created_by);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Build the match conditions based on query parameters
    const matchConditions = {
      created_by,
    };

    if (category) {
      matchConditions.category = mongoose.Types.ObjectId(category);
    }

    if (rating) {
      matchConditions.rating = parseInt(rating);
    }

    if (price) {
      matchConditions.price = { $lte: parseInt(price) };
    }

    if (event_time) {
      matchConditions.event_time = { $gte: new Date(event_time) };
    }

    if (start_time) {
      matchConditions.start_time = { $gte: new Date(start_time) };
    }

    if (end_time) {
      matchConditions.end_time = { $lte: new Date(end_time) };
    }

    if (post_type) {
      matchConditions.post_type = post_type;
    }

    if (capacity) {
      matchConditions.capacity = parseInt(capacity);
    }

    if (created_at) {
      matchConditions.createdAt = { $gte: new Date(created_at) };
    }

    // Find posts from users the current user is following with additional filtering
    const usePosts = await Post.aggregate([
      {
        $match: matchConditions,
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: parseInt(pageSize) },
    ]);

    res.status(200).json(usePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEventsByUserId = async (req, res) => {
  try {
    const {
      category,
      rating,
      price,
      page = 1,
      pageSize = 5,
      event,
      event_time,
      start_time,
      end_time,
      post_type,
      capacity,
      created_at,
      created_by,
    } = req.query;

    const user = await User.findById(created_by);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Build the match conditions based on query parameters
    const matchConditions = {
      created_by,
      event: { isEvent: true },
    };

    if (category) {
      matchConditions.category = mongoose.Types.ObjectId(category);
    }

    if (rating) {
      matchConditions.rating = parseInt(rating);
    }

    if (price) {
      matchConditions.price = { $lte: parseInt(price) };
    }

    if (event_time) {
      matchConditions.event_time = { $gte: new Date(event_time) };
    }

    if (start_time) {
      matchConditions.start_time = { $gte: new Date(start_time) };
    }

    if (end_time) {
      matchConditions.end_time = { $lte: new Date(end_time) };
    }

    if (post_type) {
      matchConditions.post_type = post_type;
    }

    if (capacity) {
      matchConditions.capacity = parseInt(capacity);
    }

    if (created_at) {
      matchConditions.createdAt = { $gte: new Date(created_at) };
    }

    // Find posts from users the current user is following with additional filtering
    const usePosts = await Post.aggregate([
      {
        $match: matchConditions,
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: parseInt(pageSize) },
    ]);

    res.status(200).json(usePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
