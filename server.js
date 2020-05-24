const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const correct = require('./routes/api/correct');

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// For development
app.use(express.static(path.join(__dirname, 'client/build')));

const db = require('./config/keys').mongoAuth;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MONGO CONNECTED'))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/correct', correct);

// For production

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
