const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'tim@gmail.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'},  process.env.JWT_SECRET).toString()
	}]
}, {
	_id: userTwoId,
	email: 'tim2@gmail.com',
	password: 'userTwoPass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userTwoId, access: 'auth'},  process.env.JWT_SECRET).toString()
	}]
}];

const todos = [{
	_id: new ObjectID(), 
	text: 'First test todo', 
	_creator: userOneId,
	completed: true, 
	completedAt: 333
},{
	_id: new ObjectID(), 
	text: 'Second test todo', 
	_creator: userTwoId,
	completed: true, 
	completedAt: 333
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		const userOne = new User(users[0]).save();
		const userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };