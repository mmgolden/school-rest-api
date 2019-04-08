'use strict';

// load modules
const express = require('express');
const router = express.Router();
const { Course } = require('../models');

// POST handles creating a new course
router.post('/', (req, res, next) => {
  const { body } = req;
  const course = new Course(body);

	course.save((err, course) => {
    if(err) return next(err);
    const { id } = course;
    res.location(`/api/courses/${id}`);
		res.status(201).end();
	});
});

// find course by ID
router.param('id', (req, res, next, id) => {
	Course.findById(id, (err, course) => {
		if(err) return next(err);
		if(!course) {
			err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		req.course = course;
		return next();
	});
});

// GET handles returning a list of courses
router.get('/', (req, res, next) => {
  Course.find({})
    .exec((err, course) => {
      if(err) return next(err);
      res.json(course);
      res.status(200).end();
    });
});

// GET handles returning a course for the provided course ID
router.get('/:id', (req, res, next) => {
  const { course } = req;
  res.json(course);
  res.status(200).end();
});

// PUT handles updating a course
router.put('/:id', (req, res, next) => {
  const { course, body } = req;

	course.update(body, (err) => {
		if(err) return next(err);
    res.status(204).end();
	});
});

// DELETE handles deleting a course
router.delete('/:id', (req, res, next) => {
  const { course } = req;

	course.remove((err) => {
    if(err) return next(err);
    res.status(204).end();
	});
});

module.exports = router;