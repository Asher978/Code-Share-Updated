const dotenv = require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../../config');
const User = require('../../models/user');

passport.use( new JwtStrategy({
  // jwtFromRequest: ExtractJwt.fromHeader('Auth'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // find the user specified in token
    const user = await User.findById(payload.sub);

    // if user doesn't exisit, handle it
    if (!user) { return done(null, false) }

    // Otherwise, return the user
    done(null, user);

  } catch(err) {
    done(err, false);
  }
}));


passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  
  try {
      
      // Find the user given the username
      const user = await User.findOne({ email });
  
      // If no user, handle it
      if (!user) { return done(null, false) }
  
      // Check if the password is correct
      // If not, handle it
      const isMatch = await user.isValidPassword(password);
  
      if (!isMatch) { return done(null, false) };
  
      done(null, user);

  } catch(err) {
      done(err, false);
  }
  
}))