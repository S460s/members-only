if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const debug = require('debug')('myapp');
const morgan = require('morgan');

const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');

const router = require('./routes');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		debug('Connected to DB.');
		app.listen(PORT, () => {
			debug(`Listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		debug(err);
	});

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const sessionStore = new MongoStore({
	mongoUrl: process.env.DB_URI,
	collectionName: 'sessions',
});

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	debug('user', req.user);
	debug('cookies', req.cookies);
	next();
});

app.use(router);
