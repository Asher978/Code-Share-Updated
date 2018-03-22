const bcrypt =  require('bcryptjs');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');

// The function that use bcrypt to compare passwords
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next) {
    if (!req.user) return res.status(404).json({status:"no user in call"});
    return next();
};

function signToken (user) {
    return JWT.sign({
        iss: 'CodeShare',
        sub: user.username,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1) // valid for one day
    }, process.env.JWT_SECRET);
};

module.exports = {
    comparePass,
    loginRequired,
    signToken
};