Meteor.publish('users', () => {
    return Users.find();
});