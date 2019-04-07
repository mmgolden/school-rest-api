'use strict';

// load modules
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// user schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  password: String,
});

// course schema
const CourseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  estimatedTime: String,
  materialsNeeded: String,
});

// define models
const User = model('User', UserSchema);
const Course = model('Course', CourseSchema);

module.exports.User = User;