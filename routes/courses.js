'use strict';

// load modules
const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const { authenticateUser } = require('./users');

// POST handles creating a new course
router.post('/', authenticateUser, (req, res, next) => {
  const { body } = req;
  
  if (body.title && body.description) {
    const course = new Course(body);

    course.save((err, course) => {
      if(err) return next(err);
      const { id } = course;

      res.location(`/api/courses/${id}`);
      res.status(201).end();
    });
  } else {
    res.status(400).json({ message: 'Incomplete data' });
  }
});

// find course by ID
router.param('id', (req, res, next, id) => {
  Course.findById(id)
    .populate({
      path: 'user',
      model: 'User',
      select: 'firstName lastName',
    })
    .exec((err, course) => {
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
    .populate({
      path: 'user',
      model: 'User',
      select: 'firstName lastName',
    })
    .exec((err, course) => {
      if(err) return next(err);
      res.json(course);
      res.status(200).end();
    });
});

// GET handles returning a course for the provided course ID
router.get('/:id', (req, res, next) => {
  if (req.course) {
    const { course } = req;
    res.json(course);
    res.status(200).end();
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// PUT handles updating a course
router.put('/:id', authenticateUser, (req, res, next) => {
  if (req.course) {
    let { course, body, currentUser } = req;

    if (course.user.id == currentUser.id) {
      course.updateOne(body, (err) => {
        if(err) return next(err);
        res.status(204).end();
      });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// DELETE handles deleting a course
router.delete('/:id', authenticateUser, (req, res, next) => {
  if (req.course) {
    const { course, currentUser } = req;

    if (course.user.id == currentUser.id) {
      course.remove((err) => {
        if(err) return next(err);
        res.status(204).end();
      });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

module.exports = { router };