const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const port = process.env.PORT;// || 5000
// Page access token
//EAAaBXiWMtsoBAOoNMZAuo2jvlNzjF2iH7ixXN34PtiIn8kFpPglH0esd5bdVnqfllgwpuhwsbMLpDBR8u0UliXgwuarR1ZB2FKrUmA5uKqPPUXe7z33ePSHaa23Fi2lBR1EdiMhGylvOrCwdMe2YpxPBcSwZC5CYyl2z5SHegZDZD

app.set('port', port);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('hello world-!');
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'super-secret' ) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});


app.post('/webhook', function (req, res) {
  let data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      const pageID = entry.id;
      const timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
        	console.log(event.message)
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});
  

function receivedMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  const messageId = message.mid;

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        // sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

// function sendGenericMessage(recipientId, messageText) {
//    To be expanded in later sections
// }

function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAaBXiWMtsoBAOoNMZAuo2jvlNzjF2iH7ixXN34PtiIn8kFpPglH0esd5bdVnqfllgwpuhwsbMLpDBR8u0UliXgwuarR1ZB2FKrUmA5uKqPPUXe7z33ePSHaa23Fi2lBR1EdiMhGylvOrCwdMe2YpxPBcSwZC5CYyl2z5SHegZDZD' },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});