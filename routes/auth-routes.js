const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');


authRouter.post('/register', usersController.create);
// users submit their login form
// send back json informationabout the status of the authentication
authRouter.post('/login', passport.authenticate('local',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash: true,
    })
);

authRouter.get('/success', (req, res) => {
    const token = authHelpers.signToken(req.user);
    res.json({
        auth: true,
        message: 'ok',
        user: req.user,
        token
    });
});

authRouter.get('/failure', (req, res) => {
    res.json({
        auth: false,
        message: 'Login failed',
        user: null,
        token: null
    })
})

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.json({
        message: 'logged out',
        auth: false,
    })
});



module.exports = authRouter;