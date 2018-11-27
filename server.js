const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB configuration
// let db = require('./config/keys').mongoURI;

let db = require('./config/keys').localMongoURI;

// connect to MongoDB
const settings = {
  reconnectTries: Number.MAX_VALUE,
  autoReconnect: true
};

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server running on port', PORT));
