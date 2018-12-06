const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const http = require('http');
const cron = require('node-cron');
const users = require('./routes/api/users');
const birthday = require('./routes/api/birthday');
// const posts = require('./routes/api/posts');
const moment = require('moment');
const twilio = require('twilio');
const keys = require('./config/keys');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB configuration
// let db = require('./config/keys').mongoURI;

let db = require('./config/keys').mongoURI;

// connect to MongoDB
const settings = {
  reconnectTries: Number.MAX_VALUE,
  autoReconnect: true
};

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/birthday', birthday);
// app.use('/api/posts', posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// ********* SEND AUTOMATIC REMINDERS

const Birthday = require('./models/Birthday');
// Load User Model
const User = require('./models/User');
function formatDate(d) {
  const date = new Date(d);
  var dd = date.getDate() + 1;
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return (d = mm + '/' + dd + '/' + yyyy);
}

cron.schedule('29 11 * * *', () => {
  Birthday.find()
    .sort({ DOB: -1 })
    .then(birthdays => {
      birthdays.forEach(birthday => {
        let userID = birthday.user;
        let bday = new Date(birthday.DOB);
        let today = new Date();
        let currentMonth = today.getMonth();
        let currentDay = today.getDate();

        if (bday.getMonth() === currentMonth && bday.getDate() === currentDay) {
          console.log('came into the if');
          console.log('USER_ID: ', userID);

          User.find({ _id: userID })
            .then(person => {
              if (!person) {
                console.log('no Person was found');
              } else {
                let userInfo = person[0];

                console.log('it is ', birthday.name, "'s birthday :) ");
                console.log(
                  '___________THE TIME IS: ' +
                    moment().format('MMMM Do YYYY, h:mm:ss a')
                );

                const accountSid = keys.accountSID; // Your Account SID from www.twilio.com/console
                const authToken = keys.authToken; // Your Auth Token from www.twilio.com/console

                const client = new twilio(accountSid, authToken);

                client.messages
                  .create({
                    body: `Hello, ${
                      userInfo.name
                    } ,this is a reminder that today is ${
                      birthday.name
                    }'s birthday today! `,
                    to: userInfo.phone, // Text this number
                    from: '+16235525460' // From a valid Twilio number
                  })
                  .then(message => console.log(message.sid));
              }
            })
            .catch(err => console.log(err, 'Error in the Users.find()'));
        }
      });
      // console.log(birthdays);
    })
    .catch(err => console.log({ nobirthdaysfound: 'No birthdays found' }));
});

setInterval(function() {
  http.get('http://birthdayreminderpal.herokuapp.com');
}, 900000); // every 5 minutes (300000)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server running on port', PORT));
