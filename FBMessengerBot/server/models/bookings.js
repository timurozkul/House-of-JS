const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds115701.mlab.com:15701/heroku_hj5gpshr');


const bookings = mongoose.model('booking', {
	// firstName: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 1,
	// 	trim: true
	// },
	// lastName: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 1,
	// 	trim: true
	// },
	bookingDate: {
		type: String,
		required: true,
		minlength: 1
	}
});


const addBooking = function(booking){

	const newBooking = new bookings(booking);

	newBooking.save().then((doc) => {
		console.log('Saved booking', doc);
	}, (e) => {
		console.log('Unable to save booking');
	});
}

const getBookings = function(){
	return bookings.find();
}

module.exports.getBookings = getBookings;
module.exports.addBooking = addBooking;