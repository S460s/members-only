const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const verifyPassword = async (password, hashPassword) => {
	const result = await bcrypt.compare(password, hashPassword);
	console.log('PASSWORD', result);
	return result;
};

const customFields = {
	usernameField: 'email',
	passwordField: 'password',
};

const verifyCallback = async (email, password, done) => {
	try {
		const user = await User.findOne({ email });
		if (!user) return done(null, false, { message: 'Incorrect email.' });
		const flag = await verifyPassword(password, user.password);
		if (!flag) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	} catch (err) {
		return done(err);
	}
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
