const express = require('express');
const request = require('request');
const moment = require('moment');
const { Wit, log } = require('node-wit');
const router = express.Router();

const bookings = require('../server/models/bookings');
// Wit.ai naming convetion for the object is actions
const actions = require('../server/responseLogic');

const verifyToken = 'something-secret';
const pageAccessToken = 'EAAa2Pz8XYZB4BAPVOCpQdDaelgPFZCRMiq9qzH578neajDslMkRnA9bQoBbVadnqO7MZBMYn4uPh1kCfB2jsdBz24fyYPpoyZC8UpnrFnnbLhwObkscoQzVNvqTnAk3xerfKUvLBs4bY4UiC9fNEYDtNfRt8fiDvLlhSKsE7mQZDZD';
const WIT_TOKEN = 'T77W25QDJ7HXKRMAQBPMYI6OMVQZH46B';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === verifyToken) {
      console.log("Validating webhook");
    
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

router.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  // We retrieve the user's current session, or create one if it doesn't exist
  // This is needed for our bot to figure out the conversation history
  const sessionId = findOrCreateSession(senderID);
  const messageId = event.message.mid;
  const messageText = event.message.text;

  if (messageText) {
    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case '/help':
        message.help(senderID);
        break;
      default:
       witAction(sessionId, sessions[sessionId].context, messageText);
    }
  }
}

const message = {
  help(recipientId){
    return this.createObj(recipientId, `To book a time with the barber shop you just have to
      type the date and time and I will check if there is an availability. :D`);
  },
  createObj(recipientId, text) {
     const messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: text
        }
    };
 
  callSendAPI(messageData); 
  }
};



function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: pageAccessToken },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
      messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

// ----------------------------------------------------------------------------
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      sessionId = k;
      sessions[sessionId] = {fbid: fbid, context: {} };
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {} };// _fbid_: fbid
  }
  console.log('------- sessions', sessions)
  return sessionId;
};

const  getSessions= function(){
  return sessions;
}

// Setting up our bot
const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});


// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
//const sessions = {};
function witAction(sessionId, context, text){
    // Let's forward the message to the Wit.ai Bot Engine
    // This will run all actions until our bot has nothing left to do

    wit.runActions(
      sessionId, // the user's current session
      text, // the user's message
      context // the user's current session state
    ).then((context) => {
      // Our bot did everything it has to do.
      // Now it's waiting for further messages to proceed.
      console.log('Waiting for next user messages');

      context = {};

      // Updating the user's current session state
      sessions[sessionId].context = context;
    })
    .catch((err) => {
      console.error('Oops! Got an error from Wit: ', err.stack || err);
    })
}

// ----------------------------------------------------------------------------
// Messenger API specific code

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference

const fbMessage = (id, text) => {

  const body = JSON.stringify({
    recipient: { id },
    message: { text },
  });

  const qs = 'access_token=' + encodeURIComponent(pageAccessToken);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};


module.exports.index = router;
module.exports.fbMessage = fbMessage;
module.exports.getSessions = getSessions;