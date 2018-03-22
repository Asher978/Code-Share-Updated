const express = require('express');
const meetupRoutes = express.Router();
const meetupHelper = require('../services/meetup/meetup-helper');

meetupRoutes.post('/', meetupHelper.getLngLat, meetupHelper.eventsFromMeetup, (req, res) => {res.json({
    data: res.locals.events
})
});



module.exports = meetupRoutes;