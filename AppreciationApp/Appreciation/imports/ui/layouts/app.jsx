import React from 'react';
import { Navigation } from '../components/navigation.jsx';

// Because we're using a stateless function, here, we automatically
// get our props as arguments and can skip the this.props business
export const App = ( { children } ) => (
    <div>
        <Navigation />
        { children }
    </div>
)