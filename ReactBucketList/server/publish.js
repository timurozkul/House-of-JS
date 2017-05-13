BucketList = new Mongo.Collection('bucketlist');

Meteor.publish("allBucketList", function(){
    return BucketList.find();
});

Meteor.publish("userBucketList", function(){
    return BucketList.find({user: this.userId});
});