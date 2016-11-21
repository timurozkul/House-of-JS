import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/MainLayout.jsx';
import BucketListWrapper from './bucketList/BucketListWrapper.jsx';
import About from './About.jsx';
import BucketListDetail from './bucketList/BucketListDetail.jsx';

FlowRouter.route('/', {
        action(){
           mount(MainLayout, {
              content: (<BucketListWrapper />)
           })
        }
});

FlowRouter.route('/about', {
    action(){
        mount(MainLayout, {
            content: (<About />)
        })
    }
});

FlowRouter.route('/bucketList/:id', {
    action(params){
        mount(MainLayout, {
            content: (<BucketListDetail id={params.id} />)
        })
    }
});