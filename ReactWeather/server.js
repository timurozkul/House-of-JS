var express = require('express');
var app = express();

// Lets you add functionality to your express
app.use(express.static('public'));

// Start the server 
app.listen(3000, function(){
    console.log('Express server is up on port 3000');
});