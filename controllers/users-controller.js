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

    addImage: async (req, res, next) => {
        const { imageUrl } = req.body;
        let updatedUserImage = {
            userPic: imageUrl
        };
        await User.findByIdAndUpdate(req.params.id, updatedUserImage, {"new": true}, (err, user) => {
            if (!err) {
                console.log("after image load", user)
            } else {
                console.log('error', err)
            }
        })
    },

    getUser: async (req, res, next) => {
        res.send(req.user)
    }

}
