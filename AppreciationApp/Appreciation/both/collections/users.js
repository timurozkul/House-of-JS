// Users = new Mongo.Collection('users');
//
//
// let UserSchema = new SimpleSchema({
//     'username': {
//         type: String,
//         label: 'Username'
//     },
//     'email': {
//         type: String,
//         label: 'E-mail'
//     },
//     'currentSubject': {
//         type: [ { } ],
//         label: 'Current appreciation subject active'
//     },
//     'currentSubject.$.subject': {
//         type: String,
//         label: 'Appreciation subjects'
//     },
//     'currentSubject.$.daysGoal': {
//         type: Number,
//         label: 'Appreciation subjects'
//     }
// });
//
// Users.attachSchema(UserSchema);