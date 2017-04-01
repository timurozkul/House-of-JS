console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

var res = notes.add(5, -2);
console.log(res, ' ---')
// fs.appendFile('greetings.txt', 'Hello world!' + os.hostname());