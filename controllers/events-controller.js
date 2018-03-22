const Event = require('../models/events');

const eventsController = {};

eventsController.index = (req, res) => {
    Event.findAll()
    .then(event => {
        res.json({
            message: 'ok',
            data: event,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

eventsController.show = (req, res) => {
    Event.findById(req.params.id)
    .then(event => {
        res.json({
            message: 'ok',
            data: event,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

eventsController.create = (req, res) => {
    Event.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        user_id: req.body.id,
        user_name: req.body.name,
    })
    .then(event => {
        res.json({
            message: 'Event added successfully :)',
            data: event,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

eventsController.update = (req, res) => {
    Event.update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
    }, req.params.id).then(event => {
        res.json({
            data: event,
            message: 'Event updated successfully',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

eventsController.delete = (req, res) => {
    Event.destroy(req.params.id)
    .then(() => {
        res.json({
            message: 'Event deleted successfully',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports = eventsController;