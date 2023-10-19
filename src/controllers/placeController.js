const Place = require('../models/Place');
const createErrorObject = require('../helpers/responses/createErrorObject');
const handleResponse = require('../helpers/responses/handleResponse');


exports.createPlace = async (req, res) => {
  try {
    const { 
        name,
        description,
        type,
        latitude,
        longitude,
        owner,
        social_media,
        google_id,
        google_rating,
        media,
        address,
        category,
        events,
        comments
    } = req.body;
    const place = new Place({
        name,
        description,
        type,
        latitude,
        longitude,
        owner,
        social_media,
        google_id,
        google_rating,
        media,
        address,
        category,
        events,
        comments,
    });
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    console.error(error);
    res.status(201).json(error);

    // handleResponse(res, createErrorObject(res, error));
  }
};

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Get a specific place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Update a place by ID
exports.updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        name,
        description,
        location,
        type,
        latitude,
        longitude,
        owner,
        social_media,
        google_id,
        google_rating,
        media,
        address,
        category,
        events,
        comments,
        popularity,
        attendance,
        price,
        startTime,
        endTime,
        timezone,
        questions,
        grade,
        mood,
      } = req.body;

    const updatedPlaceData = {
      name,
      description,
      location,
      type,
      latitude,
      longitude,
      owner,
      social_media,
      google_id,
      google_rating,
      media,
      address,
      category,
      events,
      comments,
      popularity,
      attendance,
      price,
      startTime,
      endTime,
      timezone,
      questions,
      grade,
      mood,
    };
    const place = await Place.findByIdAndUpdate(id, updatedPlaceData, { new: true });
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Delete a place by ID
exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findByIdAndRemove(id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};
