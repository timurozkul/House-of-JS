const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');

	db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
		console.log(result)
	});

	db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
		console.log(result)
	});

	db.collection('Todos').findOneAndDelete({
		_id: new ObjectID("590c7a446d3d2e7374d60263")}).then((result) => {
		console.log(result)
	});

	// db.close();
});
