const index = require('../routes/index');
const bookings = require('../server/models/bookings');
const moment = require('moment');

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    const sessions = index.getSessions();
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return index.fbMessage(recipientId, text)
      .then(() => null)
      .catch((err) => {
          console.error(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err.stack || err
          );
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },
  book({sessionId, context, text, entities}){
       let newDate = formateDate(entities);

    return bookings.getBookings().then(function (booking){
        // If any bookings in our DB is overlapping
        const overlapping = isOverlapping(newDate, booking);
        // If within the bookable time 09:00 - 17:01
        const workingHours = withinWorkingHours(newDate);
        // Only bookable after the current moment
        const afterNow = newDate.isAfter(moment());
        // Checks if conditions meet & Books new date &
        // returns context (for wit.ai response)
        context = isBookable(entities, overlapping, workingHours, afterNow, context, newDate);

        return context;
    }, (e) => {
        console.log('Unable to retrieve bookings');
    }); 
  }, 
  // If users first date is not accepted this function returns
  // 3 alternatives
  bookingRecommender({sessionId, context, text, entities}){
      // Resets all context except for requestedDate
      context = resetContext(context);

      return bookings.getBookings().then(function (booking){
        let currentRecommendation = 'recommendation1';
        let overlapping = undefined;
        let counter = 1;
        // console.log(moment(context.requestedDate, "DD MMMM YYYY HH:mm"))
        while (!context.recommendation3) {
            const newBookingDate = moment(context.requestedDate, "DD MMMM YYYY HH:mm").add(counter, 'hours');
             // If any bookings in our DB is overlapping
            overlapping = isOverlapping(newBookingDate, booking);
            // If within the bookable time 09:00 - 17:01
            const workingHours = withinWorkingHours(newBookingDate);
            // Only bookable after the current moment
            const afterNow = newBookingDate.isAfter(moment());

              if( !overlapping && workingHours && afterNow ){ 
                  // Fills/returns the recommendation to the context for output
                  wrapperObj = fillRecommendations(newBookingDate, context, currentRecommendation);
                  context = wrapperObj.context;
                  // Preparing for the next recommendation
                  currentRecommendation = wrapperObj.nextRecommendation;
              }
              counter++;
        }

        return context;
    }); // bookingRecommender
  } // action obj
}

function formateDate(entities){
   if(entities.datetime){
   let newDate = entities.datetime[0].value;
   newDate = newDate.substring(0, newDate.length - 10);
   return moment(newDate);
   }
}

function isBookable(entities, overlapping, workingHours, afterNow, context, newDate){
  // entities.datetime && !overlapping && workingHours && afterNow
  // Context object used for the different responses from the wit.ai api  
  if( entities.datetime ){
      if( !afterNow ){
          context.notAfterNow = true;
          // Used for recommendations (in the next wit.ai function execution)
          context.requestedDate = newDate.format("DD MMMM YYYY HH:mm");
          return context;
      } else if ( !workingHours ){
          context.notWorkingHours = true;
          context.requestedDate = newDate.format("DD MMMM YYYY HH:mm");
          return context;
      } else if ( overlapping ){
          context.overlapping = true;
          context.requestedDate = newDate.format("DD MMMM YYYY HH:mm");
          return context;
      } else {
          bookings.addBooking({ bookingDate: newDate });
          context.booked = newDate.format("dddd, MMMM Do YYYY, h:mm: a");
          return context;
      }
  }

  return context;
}

 // Checking if any bookings in our DB is overlapping
function isOverlapping(newDate, booking){
  let overlapping = undefined;

   for(let i = 0; i < booking.length; i ++){
       const currEntry = booking[i];
       // Checking if the current time overlaps with any other bookings
       overlapping = newDate.isBetween( moment(currEntry.bookingDate).subtract(1, 'hours'), 
                                        moment(currEntry.bookingDate).add(1, 'hours') );
     
      if( overlapping ){ return overlapping; }
    };

    return overlapping;      
}

function withinWorkingHours(newDate){
  // Checking if the current time is between 09:00 opening hour
  // & 17:01 last bookable time
  let newDateTime = moment(newDate.format('HH:mm'), 'HH:mm');
  newDateTime = newDateTime.isBetween( moment('08:59', 'HH:mm'), 
                                       moment('17:01 ', 'HH:mm') );
  return newDateTime;
}

// Fills/returns the recommendation to the context for output
function fillRecommendations(date, context, nextRecommendation){
   
    switch(nextRecommendation){
      case 'recommendation1':
        nextRecommendation = 'recommendation2';
        context.recommendation1 = date.format("DD MMMM YYYY - h:mm a");
        return { context, nextRecommendation };
        break;
      case 'recommendation2':
        nextRecommendation = 'recommendation3';
        context.recommendation2 = date.format("DD MMMM YYYY - h:mm a");
        return { context, nextRecommendation };
        break;
      case 'recommendation3':
        context.recommendation3 = date.format("DD MMMM YYYY - h:mm a");
        return { context, nextRecommendation };
        break;
      default:
        return context;
    }
}

function resetContext(context){
      delete context.overlapping;
      delete context.notWorkingHours;
      delete context.notAfterNow;
      delete context.booked;
      return context;
}

module.exports = actions;