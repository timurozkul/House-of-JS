Meteor.publish('users', () => {
    return Users.find({_id: this.userId});
});

Meteor.publish('day', () => {
    return Users.find();
});