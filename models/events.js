const db = require('../db/config');

const Event = {};

Event.findAll = () => {
    return db.query('select title, description, date, time, firstname from events join users on users.id = events.user_id');
}

//find by id
Event.findById = (id) => {
    return db.oneOrNone(`
    SELECT * FROM events
    WHERE id = $1
    `, [id]);
}

//create event
Event.create = (event) => {
    return db.one(`
    INSERT INTO events
    (title, description, date, time, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING * 
    `, [event.title, event.description, event.date, event.time, event.user_id]);
}

//editing or updating an event
Event.update = (event, id) => {
    return db.one(`
    UPDATE events SET
    title =  $1,
    description = $2,
    date = $3,
    time = $4,
    genre = $5,
    WHERE id = $6
    RETURNING *
    `, [event.title, event.description, event.date, event.time, id])
}

// deleting an event
Event.destroy = (id) => {
    return db.none(`
    DELETE From events
    WHERE id = $1
    `, [id]);
}


module.exports = Event;