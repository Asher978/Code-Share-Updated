const userRoutes = require('express').Router();
const usersController = require('../controllers/users-controller');
const passport = require('passport');
const passportConfig = require('../services/auth/jwt');
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