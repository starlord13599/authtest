const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('express-flash');
const { sequelize, Attribute } = require('./models');
const app = express();
const passport = require('./passport');
const oauth = require('./oauthServer');
const _ = require('lodash');
const { BaseError, InvalidParameterError, UserNotFound } = require('./lib/errors');
const console = require('./logger');

app.set('view engine', 'ejs');

app.use(express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
	session({
		secret: 'captainamerica',
		resave: false,
		saveUninitialized: true,
	})
);

app.oauth = oauth;
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/secret', isAuthenticated, (req, res) => {
	res.send('this is secret');
});

app.post('/token', app.oauth.token());

app.post('/login', passportAuthenticate(), (req, res) => {
	res.redirect('/');
});

app.get('/', (req, res) => {
	res.json({ message: 'in / route' });
});

app.listen(3000, async () => {
	await sequelize.authenticate();
	console.success('Databse connected');
	console.success('Accepting request on port 3000');
});

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/f');
}

app.get('/f', (req, res) => {
	res.json('login karr');
});

function passportAuthenticate() {
	return function (req, res, next) {
		const { username, password } = req.body;

		passport.authenticate('password-grant', {
			username: username,
			password: password,
		})(req, res, next);
	};
}

app.get('/attributes', async (req, res) => {
	const attributes = await Attribute.findAll();

	res.render('attributes', { attributes });
});

app.post('/attributes', async (req, res) => {
	try {
		const { old: oldAttr = [], new: newAttr = [] } = req.body;

		const { name = [], sortOrder = [] } = newAttr;

		const flattenNewAttr = name.map((name, idx) => {
			return { name, sortOrder: sortOrder[idx] };
		});

		const attributes = [...oldAttr, ...flattenNewAttr];

		const returned = await Attribute.bulkCreate(attributes, {
			updateOnDuplicate: ['id', 'name', 'sortOrder', 'updatedAt'],
		});

		let message = 'Data updated successfullly';
		let type = 'success';

		if (!returned) {
			type = 'danger';
			message = 'Data not updated successfully';
		}

		req.flash(type, message);
		res.redirect('/attributes');
	} catch (error) {
		req.flash('danger', 'Something went wrong');
		res.redirect('/attributes');
	}
});

app.get('/error-test', (req, res, next) => {
	try {
		const random = _.random(0, 10);

		if (random > 5) {
			throw new UserNotFound('The user you were lookin for is not found');
		}

		res.json('No error');
	} catch (error) {
		next(error);
	}
});

app.use((err, req, res, next) => {
	console.error(err.message);
	console.error(err.lineNumber);
	res.status(400).json(`${err.name}:${err.message}`);
});

app.use('*', (req, res) => {
	res.status(404).json('Invalid request');
});
