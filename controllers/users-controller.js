const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const bcrypt = require('bcryptjs');
const User = require('../models/user');

signToken = user => {
    return JWT.sign({
        iss: 'code_share',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) 
    }, JWT_SECRET)
}


module.exports = {
    
    register: async (req, res, next) => {
        const { email, password, username } = req.value.body;

        // check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) { 
            return res.status(403).json({ error: 'This email is aleady in USE' })
        }

        const newUser = new User({ email, password, username });
        await newUser.save();

        // once the user is saved, generate & respond with a jsonweb token
        const token = signToken(newUser);
        res.status(200).json({ token, newUser });
    },

    login: async (req, res, next) => {
        const { user } = req;
        const token = signToken(user);
        res.status(200).json({ token, user });
    },

    getUser: async (req, res, next) => {
        res.send(req.user)
    }

}



/*
-------------------------------------------------------------------------
-----------------------  OLD USER CONTROLLER ----------------------------
-------------------------------------------------------------------------
const signToken = user => {
    return JWT.sign({
        iss: 'CodeShare',
        sub: user.username,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1) // valid for one day
    }, process.env.JWT_SECRET);
};


const usersController = {};
usersController.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
        username: req.body.username,
        password_digest: hash,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }).then(user => {
        req.login(user, (err) => {
            if (err) return next(err);
            const token = signToken(user);
            res.json({
                user,
                token,
                auth: true,
            })
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

usersController.index = (req, res) => {
    res.json({
        user: req.user,
        data: 'Put a user profile on this route'
    });
}

-------------------------------------------------------------------------
-----------------------  OLD USER CONTROLLER ----------------------------
-------------------------------------------------------------------------
*/
