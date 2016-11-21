import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BucketListSingle from './BucketListSingle.jsx';
import FormBucketList from './FormBucketList.jsx';

BucketList = new Mongo.Collection('bucketlist');

export default class BucketListWrapper extends TrackerReact (React.Component) {
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
        return BucketList.find().fetch();
    }

    render () {
        let bucket = this.bucketlist();

        return  (
            <ReactCSSTransitionGroup
        component="div"
        transitionName="route"
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={400}
        transitionAppear={true}>
             <h1>Bucket List - {Session.get('test')}</h1>
               <FormBucketList />
                    <ReactCSSTransitionGroup
                        component="ul"
                    transitionName="resolutionLoad"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}>
                        {this.bucketlist().map((bucketItem) => {
                           return  <BucketListSingle key={bucketItem._id} bucketList={bucketItem}/>
                        }) }
                        </ReactCSSTransitionGroup>
            </ReactCSSTransitionGroup>
        )
    }
}
