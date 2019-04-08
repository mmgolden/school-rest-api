'use strict';

// load modules
const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const { User } = require('../models');

// POST handles creating a new user
router.post('/', (req, res, next) => {
  const { body } = req;
  const user = new User(body);

	user.save((err) => {
    if(err) return next(err);
    res.location('/');
		res.status(201).end();
	});
});

// GET handles returning the current authenticated user
router.get('/', (req, res, next) => {
  
});

module.exports = router;