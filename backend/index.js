const express = require('express');
require('express-async-errors');
require('./app/startup/db');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser(function (token, cb) {
  cb(null, token);
});

passport.deserializeUser(function (token, cb) {
  cb(null, token);
});

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SITE_URL,
    methods: ['GET', 'POST'],
    credentials: false,
  },
});
io.on('connection', async (socket) => {
  // Socket.IO logic
});

// Routes
const v1Routes = require('./app/routes/v1/routes');
app.use('/api/v1', v1Routes);


// Root route
app.get('/', (req, res) => {
  res.json('Welcome to Student Backend');
});

// Start server
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
