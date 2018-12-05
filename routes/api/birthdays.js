const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/birthday');

// Load Birthday Model
const Birthday = require('../../models/Birthday');
// Load User Model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'birthdays Works' }));

// @route   POST api/birthdays
// @desc    Create brithday
// @access  private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Birthday({
      name: req.body.name,
      birthday: req.body.birthday,
      user: req.user.id
    });

    newPost.save().then(birthday => res.json(birthday));
  }
);
