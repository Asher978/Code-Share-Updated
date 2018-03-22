const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    email: String,
    password: String,
    username: String
});

UserSchema.pre('save', async function (next) {

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate a password hash (hash + salt)
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();

    } catch(err) {
        next(err);
    }
});

// compares user enetered password to the hashed passwprd
UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);

    } catch(err) {
        throw new Error(err);
    }
}




const User = mongoose.model('User', UserSchema);

module.exports = User;







/*
-------------------------------------------------------------------------
-----------------------  OLD PSQL USER MODEL ----------------------------
-------------------------------------------------------------------------
const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
    return db.oneOrNone(`
        SELECT * FROM users 
        WHERE username = $1
    `, [userName]);
};

User.create = user => {
    return db.one(`
    INSERT INTO users 
    (username, password_digest, email, firstname, lastname)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [user.username, user.password_digest, user.email, user.firstname, user.lastname])
};

module.exports = User;
-------------------------------------------------------------------------
----------------------- END OLD PSQL USER MODEL -------------------------
-------------------------------------------------------------------------
*/