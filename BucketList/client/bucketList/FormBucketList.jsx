// import React.Component from 'react';
import React, {Component} from 'react';

//Tracker react only done when pulling in data
export default class FormBucketList extends Component {
   

    addBucketList(event){
        event.preventDefault();
        var text = this.refs.bucketlist.value.trim();
        if(text) {
            // The arrow function allows us to this
            // Arrow function difference is the context of this
            // Unlike the traditional function (){}
            Meteor.call('addItem', text, (error, data) => {
                if (error) {
                    Bert.alert('Please login before submitting', 'danger', 'fa-frown-o');
                } else {
                    this.refs.bucketlist.value = "";
                }

            });
        }

    }
    render() {
        return (
            <form className="new-bucketList" onSubmit={this.addBucketList.bind(this)}>
                <input type="text" ref="bucketlist" placeholder="Finsih React Meteor Series"/>
            </form>
        )
    }
}