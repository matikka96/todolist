const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Routes
// const apiRoutes = require('./routes/api-routes');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoose
mongoose.connect(keys.mongodb.uri, () => {
	console.log('Connected to DB via mongoose');
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Main page, logs database result
app.get('/', (req, res) => {
	// res.sendFile(__dirname + '/test.html');		// test app
	res.sendFile(__dirname + '/index.html');	// Todo app
});

app.get('/login', (req, res) => {
	if (req.user) {
		// If signed in
		res.sendFile(__dirname + '/index.html');
	} else {
		// If not signed in
		res.sendFile(__dirname + '/login.html');
	}

});

// Listening PORT 3000
app.listen(3000, () => {
	console.log('listening on 3000')
});