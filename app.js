'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const coursesRoute = require('./routes/courses');

// connect mongoose to database
mongoose.connect('mongodb://localhost:27017/fsjstd-restapi', { useNewUrlParser: true });
const { connection } = mongoose;

// handle error connecting to the database
connection.on('error', (err) => {
	console.error('connection error:', err);
});

// handle when the connection has been successfully opened
connection.once('open', () => {
	console.log('database connection successful');
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Setup request body JSON parsing
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// routes
app.use('/api/users', usersRoute.router);
app.use('/api/courses', coursesRoute.router);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the school REST API!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  const { stack, status, message } = err;

  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(stack)}`);
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({ message });
  } else {
    res.status(status || 500).json({
      message,
      error: {},
    });
  }
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
