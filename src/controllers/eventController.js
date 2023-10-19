const Event = require('../models/Event');
const createErrorObject = require('../helpers/responses/createErrorObject');
const handleResponse = require('../helpers/responses/handleResponse');
const handlePagination = require('../helpers/responses/handlePagination');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
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
        mood,
        popularity,
        rating,
        grouping_preference,
        activity_objective,
        atmosphere,
        media,
        questions,
        comments,
        capacity
      } = req.body;
  
      const event = new Event({
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
        mood,
        popularity,
        rating,
        grouping_preference,
        activity_objective,
        atmosphere,
        media,
        questions,
        comments,
        capacity
      });
  
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
        handleResponse(res, createErrorObject(res, error));
    }
  };

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};


// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
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
      } = req.body;
  
      const updatedEventData = {
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
      };
  
      const event = await Event.findByIdAndUpdate(id, updatedEventData, { new: true });
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      handleResponse(res, createErrorObject(res, error));
    }
  };
  

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndRemove(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    handleResponse(res, createErrorObject(res, error));
  }
};

// get events by categories
exports.getAllEventsByCategories = async (req, res) => {
    try {
        const { category, mood, popularity, rating, grouping_preference, activity_objective, atmosphere, price, page = 1, pageSize = 10 } = req.query;        
        let query= { 
            category, 
            mood, 
            popularity, 
            rating, 
            grouping_preference, 
            activity_objective, 
            atmosphere, 
            price,
            capacity,
            pageSize,
            page,
            created_at,
            event_time
        }
        query= JSON.parse(JSON.stringify(query));  

        const resPaginated= await handlePagination(Event, req, res, query);
        console.log(resPaginated)
        res.status(200).json(resPaginated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };