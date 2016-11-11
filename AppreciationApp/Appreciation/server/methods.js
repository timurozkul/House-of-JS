Meteor.methods({
    // 'addUser'(profile) {
    //     Users.insert(profile);
    // },
    'addSubject'(userId, subject) {
        Users.insert(profile);
    }
    
});
//       Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {coursesTaught: courseTaught}});

// editAssessment(oldAssessmentId, newAssessment){
//     Assessment.update({_id: oldAssessmentId}, {$set:
//     {date: newAssessment.date, time: newAssessment.time, location: newAssessment.location, postcode: newAssessment.postcode } });
// }