const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('SomeoneJoinMessage', {
  		from: 'Admin',
  		text: 'Someone joined the chat room'
  	});

  socket.on('createMessage', (message) => {
  	console.log('createMessage', message);

  	io.emit('welcomeMessage', generateMessage('Admin', 'New user joined'));



  	// socket.emit: commits to a single connection
  	// io.emit: commits to all connection
  	io.emit('newMessage', generateMessage(message.from, message.text));

  	// Broadcasting is when a message is sent to all except the sender
  	// socket.broadcast.emit('newMessage', {
  	// 	from: message.from,
  	// 	text: message.text,
  	// 	createAt: new Date().getTime()
  	// });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
