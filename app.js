const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
// instance of express app
const app = express();
const server = require('http').createServer(app);
// requiring .env file
require('dotenv').config();
const keys = require('./keys/keys');

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB 🚀');
});
mongoose.connection.on('error', err => {
  console.log('Database error', err);
});




// --------------  MIDDLEWARE  ---------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`));
// --------------  END MIDDLEWARE ---------------


if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}


//  ----------------   PORT SETUP ---------------
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Alive on port ${PORT}`);
});
// ---------------- END OF PORT SETUP -------------


// ---------------  ROUTES  -----------------
//index route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// User routes
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

// route for code eval
const codeRoutes = require('./routes/code-routes');
app.use('/code', codeRoutes);
app.use('/editor', codeRoutes);

const uploadRoutes = require('./routes/upload-routes');
app.use('/upload', uploadRoutes);
// ----------------  END OF ROUTES ----------------


// --------------  SOCKETS  -----------------------
const io = module.exports.io = require('socket.io').listen(server);
const SocketManager = require('./sockets/SocketManager');
io.on('connection', SocketManager);
// ------------- END SOCKETS ----------------------
