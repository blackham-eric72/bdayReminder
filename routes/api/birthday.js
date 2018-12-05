const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateBirthdayInput = require('../../validation/birthday');

// Load Birthday Model
const Birthday = require('../../models/Birthday');
// Load User Model
const User = require('../../models/User');

// @route   GET api/birthday/test
// @desc    Tests birthday route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Birthday Works' }));

// @route   GET api/birthdays
// @desc    Get all birthdays
// @access  Public
router.get('/', (req, res) => {
  Birthday.find()
    .sort({ date: -1 })
    .then(birthdays => res.json(birthdays))
    .catch(err =>
      res.status(404).json({ nobirthdaysfound: 'No birthdays found' })
    );
});
// @route   GET api/birthday/mybirthdays
// @desc    Get current users birthdays
// @access  Private
router.get(
  '/mybirthdays',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Birthday.find({ user: req.user.id })
      .then(birthdays => {
        if (!birthdays) {
          errors.nobirthdays = 'There are no birthdays for this user';
          return res.status(404).json(errors);
        }
        res.json(birthdays);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBirthdayInput(req.body);
    console.log(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newBirthday = new Birthday({
      name: req.body.name,
      DOB: req.body.DOB,
      user: req.user.id
    });

    newBirthday
      .save()
      .then(birthday => res.json(birthday))
      .catch(err => res.json(err));
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('id? - ', req.params.id);
    Birthday.deleteOne({ _id: req.params.id })
      .then(bday => {
        console.log(bday);
        res.json({ success: true });
      })
      .catch(err => res.json(err));
  }
);

// // @route   GET api/birthday/edit-birthday/:id
// // @desc    Get single birthday
// // @access  Public
// router.get('/edit-birthday', (req, res) => {
//   // console.log(req.params.bdayId);
//   // Birthday.find({ DOB: req.params.bdayId })
//   //   .then(birthday => console.log(Birthday was))
//   //   .catch(err => {
//   //     res.status(400);
//   //     res.json(err);
//   //   });
// });

// router.get(
//   '/edit-birthday/:bdayId',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     console.log(req.params);
//     Birthday.findById(req.params.bdayId)
//       .then(bday => res.json(bday))
//       .catch(err =>
//         res.status(404).json({ nobirthdayfound: 'No Birthday Found' })
//       );
//   }
// );

// router.post(
//   '/edit-birthday/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateBirthdayInput(req.body);
//     console.log(req.body);

//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }

//     const birthdayFields = {};
//     birthdayFields.user = req.user.id;
//     if (req.body.name) birthdayFields.name = req.body.name;
//     if (req.body.DOB) birthdayFields.DOB = req.body.DOB;

//     Birthday.findOneAndUpdate(
//       { user: req.user.id, DOB: req.birthday.DOB },
//       { $set: birthdayFields },
//       { new: true }
//     )
//       .then(birthday => res.json(birthday))
//       .catch(err => res.json(err));
//   }
// );

// @route     DELETE api/birthday/:id
// DELTE POST
// PRIVATE

module.exports = router;
