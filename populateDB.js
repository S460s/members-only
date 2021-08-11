if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const debug = require('debug')('populate');

const User = require('./models/User');
const Message = require('./models/Message');

const users = [];

async function createUser(userInfo) {
	const user = new User(userInfo);
	try {
		const newUser = await user.save();
		debug('User created', newUser);
		users.push(newUser);
		return newUser;
	} catch (err) {
		debug(`Error while making user: ${err.message}`);
	}
}

async function populateUsers() {
	return Promise.all([
		createUser({
			firstname: 'Winston',
			lastname: 'Smith',
			email: 'smith@gmail.com',
			password: 'ws123456',
		}),
		createUser({
			firstname: 'Mike',
			lastname: 'Green',
			email: 'mikeg@gmail.com',
			password: 'mg123456',
		}),
	]);
}

async function createMessage(messageInfo) {
	const message = new Message(messageInfo);
	try {
		const newMessage = await message.save();
		debug('Message created', newMessage);
		return newMessage;
	} catch (err) {
		debug(`Error while createing message: ${err.message}`);
	}
}

async function populateMessages() {
	return Promise.all([
		createMessage({
			title: 'test message',
			text: 'Some text',
			author: users[0],
		}),
		createMessage({
			title: 'test message 2',
			text: 'Some text 2',
			author: users[1],
		}),
	]);
}

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(async () => {
		debug('Connected');
		await populateUsers();
		await populateMessages();
		mongoose.connection.close();
		debug('Done');
		debug('Dissconected');
	})
	.catch((err) => {
		console.log(err.message);
		mongoose.connection.close();
		debug('Dissconected');
	});
