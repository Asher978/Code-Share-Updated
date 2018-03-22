const express = require('express');
const eventRoutes = express.Router();

const eventsController = require('../controllers/events-controller');

eventRoutes.get('/', eventsController.index);
eventRoutes.post('/', eventsController.create);

eventRoutes.get('/:id', eventsController.show);
eventRoutes.put('/:id', eventsController.update);
eventRoutes.delete('/:id', eventsController.delete);

module.exports = eventRoutes;