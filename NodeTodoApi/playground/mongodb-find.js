const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');

	db.collection('Todos').find({
		_id: new ObjectID('590c7a1a9b626b7356078317')
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});
	// db.close();
});
