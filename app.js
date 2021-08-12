if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const debug = require('debug')('myapp');
const morgan = require('morgan');

const express = require('express');
const mongoose = require('mongoose');
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
		console.log(err);
	});

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);
