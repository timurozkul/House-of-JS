Meteor.methods({

    addItem(item){
        check(item, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        BucketList.insert({
            text: item,
            complete: false,
            createdAt: new Date(),
            user: Meteor.userId()
        })
    },
    toggleBucketList(bucketList){
        check(bucketList, Object);
        if(Meteor.userId() !== bucketList.user){
            throw new Meteor.Error('not-authorized');
        }

        BucketList.update(bucketList._id, {$set: {complete: !bucketList.complete} });
    },
    deleteBucketList(bucketList){
        check(bucketList, Object);
        if(Meteor.userId() !== bucketList.user){
            throw new Meteor.Error('not-authorized');
        }

        BucketList.remove(bucketList._id);
    }

});