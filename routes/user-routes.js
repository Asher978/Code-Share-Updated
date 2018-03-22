// const authHelpers = require('../services/auth/auth-helpers');

// userRoutes.get('/', authHelpers.loginRequired, usersController.index);


const userRoutes = require('express').Router();
const usersController = require('../controllers/users-controller');
const passport = require('passport');
const passportConf = require('../services/auth/jwt');
// const passportLoc = require('../services/auth/local');
const { validateBody, schemas } = require('../services/validators/validate')


userRoutes.post('/register', validateBody(schemas.authSchema), usersController.register);

userRoutes.post('/login', passport.authenticate('local', { session: false }), usersController.login);

userRoutes.get('/current_user', passport.authenticate('jwt', { session: false }), usersController.getUser)

userRoutes.get('/logout', (req, res) => {
  req.logout();
  res.json({
    message: 'logged out',
  })
})


module.exports = userRoutes;