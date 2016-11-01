Meteor.methods({
    'addUser'(profile) {
        Users.insert(profile);
    }
});