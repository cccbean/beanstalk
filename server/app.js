const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

// DATA
const users = [
	{
		id: 1,
		username: 'rosa',
		password: 'lina',
	},
	{
		id: 2,
		username: 'billy',
		password: 'bob',
	},
];

const app = express();
const PORT = 3000;

passport.use(
	new LocalStrategy(async (username, password, done) => {
    let myUser;
		let userExists = false;
		let passwordMatches = false;
		users.forEach((user) => {
			if (user.username === username) {
				userExists = true;
				if (user.password === password) {
					passwordMatches = true;
          myUser = user;
				}
			}
		});
		if (!userExists) {
			return done(null, false, { message: 'Incorrect username' });
		}
		if (!passwordMatches) {
			return done(null, false, { message: 'Incorrect password' });
		}
		return done(null, myUser);
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = users.filter((user) => user.id === id);
	done(null, user);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
  console.log(req.user);
  res.json({user: req.user})
})

app.get('/login-failed', (req, res) => {
  res.json('error logging in')
})

app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	let usernameAlreadyExists = false;
	users.forEach((user) => {
		if (user.username === username) {
			usernameAlreadyExists = true;
		}
	});
	if (usernameAlreadyExists) {
		return res.json({ error: 'username already exists' });
	}
	users.push({ username, password });
	return res.json(users);
});

app.post(
	'/login',
	passport.authenticate('local'), (req, res) => {
    if (req.user) {
      return res.json(req.user)
    }
    return res.json('error logging in')
  });

app.listen(PORT, () => console.log('server listening on http:localhost/3000'));
