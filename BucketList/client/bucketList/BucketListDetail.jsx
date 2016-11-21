import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class BucketListDetail extends Component {

    constructor(){
        super();

        // Cannot do this without TrackerReact
        this.state = {
            subscription: {
                bucketList: Meteor.subscribe("userBucketList")
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.bucketList.stop();
    }

    bucketlist() {
        return BucketList.findOne(this.props.id);
    }

    render() {
        let buc = this.bucketlist();

        if(!buc){
            return(<div>Loading...</div>)
        }

        return (
            <div>
                <h1>{this.bucketlist().text}</h1>
            </div>
        )
    }
}