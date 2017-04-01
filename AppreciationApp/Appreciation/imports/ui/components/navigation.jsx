import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
    <ul>

        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/one" activeClassName="active">Page One</Link></li>
        <li><Link to="/two" activeClassName="active">Page Two</Link></li>
    </ul>
)

// This means that if we used a plain <Link /> component
//here, no matter what link we visited in our app, "Index"
//would always remain highlighted. To differentiate this route from the others, we use <IndexLink />