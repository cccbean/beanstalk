const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

require('dotenv').config();
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const User = require('./models/user');
const Chat = require('./models/chat');
const Message = require('./models/message');
const { Socket } = require('engine.io');

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return done(null, false, { message: 'incorrect username' });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: 'incorrect password' });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// TODO: sanitize information
app.post('/signup', async (req, res, next) => {
	bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
		// TODO: handle error
		try {
			const user = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			const result = await user.save();
			res.sendStatus(200);
		} catch (err) {
			return next(err);
		}
	});
});

app.post('/login', passport.authenticate('local'), (req, res) => {
	if (req.user) {
		// TODO: find a better way to do this
		const clientUser = {
			_id: req.user._id,
			username: req.user.username,
			isOnline: req.user.isOnline,
			friends: req.user.friends,
		};
		return res.json(clientUser);
	}
	return res.json('error logging in');
});

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	socket.on('get-chats', async (data) => {
		const chats = await Chat.find({ users: data._id }).populate('users', '-password').exec();
		socket.emit('get-chats', chats);
	});

	socket.on('get-messages', async (data) => {
		const socketRooms = socket.rooms;
		const rooms = [...socketRooms];
		if (rooms.length > 1) {
			socket.leave(`${rooms[1]}`);
		}
		socket.join(`${data}`);
		const messages = await Message.find({ chat: data })
			.populate('user', '-password')
			.sort({ timestamp: 1 })
			.exec();
		io.to(`${data}`).emit('get-messages', messages);
	});

	socket.on('send-message', async (data) => {
		const message = new Message({
			user: data.user._id,
			chat: data.chat,
			message: data.message,
		});
		const newMessage = await message.save();
		const messageWithTimestamp = await Message.findById(newMessage._id)
			.populate('user', '-password')
			.exec();
		const socketRooms = socket.rooms;
		const rooms = [...socketRooms];
		io.to(`${rooms[1]}`).emit('send-message', messageWithTimestamp);
	});

	socket.on('search', async (data) => {
		const myId = data.myUser._id;
		const regex = new RegExp(data.search, 'i');
		const userSearch = await User.find({ username: regex })
			.where('_id')
			.ne(myId)
			.select('-password')
			.sort({ username: 1 })
			.exec();
		// TODO: error check
		socket.emit('search', userSearch);
	});

	socket.on('new-chat', async (data) => {
		console.log(data);
	})
});

httpServer.listen(PORT, () => console.log('server listening on http:localhost/3000'));
