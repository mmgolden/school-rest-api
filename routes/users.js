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

  if (body.firstName && body.lastName && body.emailAddress && body.password) {
    const { emailAddress } = body;

    User.findOne({ emailAddress }, (err, user) => {
      if(err) return next(err);
  
      if (!user) {
        const user = new User(body);
        user.password = bcryptjs.hashSync(user.password);
        user.save((err) => {
          if(err) return next(err);
          res.location('/');
          res.status(201).end();
        });
      } else {
        res.status(400).json({ message: 'Email address already exists' });
      }
    });
  } else {
    res.status(400).json({ message: 'Incomplete data' });
  }
  
});

// authenticate the user
const authenticateUser = (req, res, next) => {
  const credentials = auth(req);
  
  if (credentials) {
    const { name, pass } = credentials;

    User.findOne({ emailAddress: name }, (err, user) => {
      if(err) return next(err);

      if (user) {
        const { emailAddress, password } = user;
  
        const authenticated = bcryptjs
          .compareSync(pass, password);
  
        if (authenticated) {
          console.log(`Authentication successful for: ${emailAddress}`);
          req.currentUser = user;
          next();
        } else {
          res.status(401).json({ message: `Authentication failure for: ${emailAddress}` });
        }
      } else {
        res.status(401).json({ message: `User not found for: ${name}` });
      }
    });
    
  } else {
    res.status(401).json({ message: 'Access denied' });
  }
}

// GET handles returning the current authenticated user
router.get('/', authenticateUser, (req, res, next) => {
  const { firstName, lastName, emailAddress } = req.currentUser;
  res.status(200).json({ firstName, lastName, emailAddress });
});

module.exports = {
  router,
  authenticateUser,
};