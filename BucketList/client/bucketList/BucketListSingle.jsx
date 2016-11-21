import React, {Component} from 'react';

export default class BucketListSingle extends Component {

    toggleChecked() {
        Meteor.call('toggleBucketList', this.props.bucketList, );
    }
    deleteBucketList() {
        Meteor.call('deleteBucketList', this.props.bucketList);
    }

    render() {
        const bucketListClass = this.props.bucketList.complete ? "checked" : "";
        const status = this.props.bucketList.complete ? <span className="completed">Completed</span> : "";

        return (
            <li className={bucketListClass}>
                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.bucketList.complete}
                    onClick={this.toggleChecked.bind(this)}
                />
                <a href={`/bucketList/${this.props.bucketList._id}`}> {this.props.bucketList.text} </a>
                {status}
                <button className="btn-cancel"
                        onClick={this.deleteBucketList.bind(this)} >
                    &times;
               </button>
            </li>
        )
    }

}