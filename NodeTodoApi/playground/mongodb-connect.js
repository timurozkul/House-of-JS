const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');
	db.collection('Todos').insertOne({
		text: 'Yello',
		completed: false
	}, (err, result) => {

		if(err){
			return console.log('Unable to insert todo', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2 ));
	});

	db.close();
});
