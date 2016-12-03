var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Weather = require('Weather');
var About = require('About');
var Examples = require('Examples');

// var Route = require('react-router').Router;      // Same as the above  // Desctructering ES2015

// var objOne = {
//     name: "Timur Ozkul",
//     location: "Portugal"
// };
//
// var objTwo = {
//     age: 25,
//     ...objOne/ Spread operator
// };

require('style!css!sass!foundation-sites/dist/foundation.min.css');
$(document).foundation();

require('style!css!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={Main}>
          <Route path="about" component={About}/>
          <Route path="examples" component={Examples}/>
        <IndexRoute components={Weather}/>
      </Route>
  </Router>,
    document.getElementById('app')
);
