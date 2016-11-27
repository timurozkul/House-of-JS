var express = require('express');
var app = express();
// Access enviourment variables
const PORT = process.env.PORT || 3000;

//Lecture 47
app.use(function (req, res, next) {
    if(req.headers['x-forwarded-proto'] === 'http') {
        next();
    } else {
        res.redirect('http://' + req.hostname + req.url);
    }
});


// Lets you add functionality to your express
app.use(express.static('public'));

// Start the server 
app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT);
});