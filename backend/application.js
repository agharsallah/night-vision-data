const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db, {useMongoClient: true} );;
var db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log('Database error: ' + err);
});
/* Export DB for the grid fs initialization */
var DB=db
exports.DB = DB;
// Instantiate express
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Set public folder using built-in express.static middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(busboyBodyParser({ limit: '15mb' }));  

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Set body parser middleware
app.use(bodyParser.json());

// Use passport middleware
/* app.use(passport.initialize());
app.use(passport.session()); */

/* require('./config/passport')(passport); */

// Initialize routes middleware
app.use('/api', require('./routes/routes'));

// Use express's default error handling middleware
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3100;

app.listen(3100, () => {
  console.log('Listening on port ' + port);
});
