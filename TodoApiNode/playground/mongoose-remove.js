const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log();
// });

Todo.findByIdAndRemove('590e199cc770afa0593404ba').then((todo) => {
	console.log(todo);
});

