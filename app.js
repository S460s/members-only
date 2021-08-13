if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const debug = require('debug')('myapp');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const express = require('express');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const router = require('./routes');
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

app.use(compression());
app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: true,
			directives: {
				'script-src':
					'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
			},
		},
	})
);

const sessionStore = new MongoStore({
	mongoUrl: process.env.DB_URI,
	collectionName: 'sessions',
});

app.use(flash());

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
	debug('is authenticated', req.isAuthenticated());
	next();
});

app.use(function (req, res, next) {
	res.locals.currentUser = req.user || {};
	next();
});

app.use(router);
