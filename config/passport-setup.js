const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret,
		callbackURL: '/auth/google/redirect'
	}, (accessToken, refreshToken, profile, done) => {
		// console.log(profile);
		User.findOne({googleId: profile.id}).then((currentUser) => {
			if (currentUser) {
				console.log('USER ALREADY EXISTS: \n' + currentUser);
				done(null, currentUser);
			} else {
				new User({
					username: profile.displayName,
					googleId: profile.id,
					tasks: String
				}).save().then((newUser) => {
					console.log('New user: '+newUser);
					done(null, newUser);
				});
			}
		})
	})
);