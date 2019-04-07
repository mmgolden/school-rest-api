'use strict';

// load modules
const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const User = require('./models').User;

// handles creating a new user
router.post('/users', (req, res) => {
  const user = new User(req.body);
	user.save((err) => {
    if(err) return next(err);
    res.location('/');
		res.status(201).end();
	});
});

// handles returning the current authenticated user
router.get('/users', (req, res) => {
  
});

module.exports = router;