const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const placeRoutes = require("./places");
const eventRoutes = require("./events");
const commentsRoutes = require("./comments");

// Use the imported route files
router.use(userRoutes);
router.use(placeRoutes);
router.use(eventRoutes);
router.use(commentsRoutes);

module.exports = router;
