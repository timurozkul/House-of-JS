// Day = new Mongo.Collection('day');
//
//
// let UserSchema = new SimpleSchema({
//     'date': {
//         type: [ String ],
//         label: 'Date'
//     },
//     'subject.$.subject': {
//         type: String,
//         label: 'Subject'
//     },
//     'subject.$.score': {
//         type: Number,
//         label: 'Subject score'
//     },
//     'dayScore': {
//         type: Number,
//         label: 'Rated score for how someone feels for that day'
//     },
//     'feedback': {
//         type: String,
//         label: 'Reason why that person thinks that they deserve that dayScore'
//     }
// });
//
// Day.attachSchema(UserSchema);
