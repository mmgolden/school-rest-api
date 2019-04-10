'use strict';

// load modules
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { User } = require('../models');

// POST handles creating a new user
router.post('/', (req, res, next) => {
  const { body } = req;
  const user = new User(body);
  user.password = bcryptjs.hashSync(user.password);

	user.save((err) => {
    if(err) return next(err);
    res.location('/');
		res.status(201).end();
	});
});

// authenticate the user
const authenticateUser = (req, res, next) => {
  let message = null;

  const credentials = auth(req);
  
  if (credentials) {
    const { name, pass } = credentials;

    User.findOne({ emailAddress: name })
      .then(user => {
        if (user) {
          const { password, emailAddress } = user;
    
          const authenticated = bcryptjs
            .compareSync(pass, password);
    
          if (authenticated) {
            console.log(`Authentication successful for: ${emailAddress}`);
            req.currentUser = user;
          } else {
            message = `Authentication failure for: ${emailAddress}`;
          }
        } else {
          message = `User not found for: ${name}`;
        }
      });
    
  } else {
    message = 'Auth header not found';
  }

  // if user authentication failed
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}

// GET handles returning the current authenticated user
router.get('/', authenticateUser, (req, res, next) => {
  console.log(req.currentUser);
});

module.exports = router;