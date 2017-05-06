const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('unable to connect to MongoDB server');
	}

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('590c7a446d3d2e7374d60263')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	console.log('Connected to MongoDB server');

	
	// db.close();
});
