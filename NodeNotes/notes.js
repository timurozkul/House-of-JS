console.log('Starting notes.js');
const fs = require('fs');

const fetchNotes = () => {
	try {
			const notesString = fs.readFileSync('notes-data.json');
			return JSON.parse(notesString);
		} catch(e) {
			return [];
	}
}

const saveNotes = (notes) => {
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
	const notes = fetchNotes();
	const note = { title, body };

	
	
	const duplicateNotes = notes.filter( note => note.title === title );

	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

const getAll = () => {
return fetchNotes();
};

const getNote = (title) => {
	const notes = fetchNotes();
	const filteredNotes = notes.filter( note => note.title === title );
	return filteredNotes[0];
};

const removeNote = (title) => {
	const notes = fetchNotes();
	const filteredNoted = notes.filter(note => note.title !== title);
	saveNotes(filteredNoted);

	return notes.length !== filteredNoted.length;
};

const logNote = (note) => {
	console.log('---');
	console.log('Title: ' + note.title);
	console.log('Body: ' + note.body);
}

module.exports = {
	addNote, // <-- is identical to this addNote: addNote
	getAll,
	getNote,
	removeNote,
	logNote
};


// module.exports.addNote = () => {
// 	console.log('addNote');
// 	return 'New note';
// };

// module.exports.add = (a, b) => {
// 	return a + b;
// };