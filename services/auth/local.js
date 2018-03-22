const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const init = require('./passport');
const User = require('../../models/user');
const authHelpers = require('./auth-helpers');


init();

console.log('USER MODEL', User)
// --------- New Local Strategy -------------------
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
        const isMatch = user.isValidPassword(password);
    
        if (!isMatch) { return done(null, false) };
    
        done(null, user);

    } catch(err) {
        done(err, false);
    }
    
}))

// --------- End New Local Strategy ---------------

// --------------  OLD LOCAL STRATEGY --------------------------
// passport.use(
//     new LocalStrategy(options, (username, password, done) => {
//         User.findByUserName(username)
//             .then(user => {
//                 if (!user) {
//                     return done(null, false);
//                 }
//                 if (!authHelpers.comparePass(password, user.password_digest)) {
//                     return done(null, false);
//                 }else {
//                     return done(null, user);
//                 }
//             }).catch(err => {
//                 console.log(err);
//                 return done(err);
//             });
//     })
// )
// -------------  END OLD LOCAL STRATEGY ---------------------------

module.exports = passport;
