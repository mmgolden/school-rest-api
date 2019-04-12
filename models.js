'use strict';

// load modules
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// user schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'First name is required',
  },
  lastName: {
    type: String,
    required: 'Last name is required',
  },
  emailAddress: {
    type: String,
    required: 'Email address is required',
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'A valid email address is required'],
  },
  password: {
    type: String,
    required: 'Password is required',
  },
});

// course schema
const CourseSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
  },
  title: {
    type: String,
    required: 'Title is required',
  },
  description: {
    type: String,
    required: 'Description is required',
  },
  estimatedTime: String,
  materialsNeeded: String,
});

// define models
const User = model('User', UserSchema);
const Course = model('Course', CourseSchema);

module.exports = {
  User,
  Course,
};