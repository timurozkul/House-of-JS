var React = require('react');
var {Link} = require('react-router');
// var Examples = React.createClass({
//    render: function () {
//        return (
//        <h3>Examples Component</h3>
//        );
//    }
// });

// STATELESS FUNCTIONAL COMPONENTS

var Examples = (props) => {
    return (
        <div>
            <h1 className="text-center page-title">Examples</h1>
            <p>Here are a few examples location to try out:</p>
            <ol>
                <li>
                    <Link to="/?location=Faro">Faro, Portugal</Link>
                </li>
                <li>
                    <Link to="/?location=Rio">Rio, Brazil</Link>
                </li>
                <li>
                    <Link to="/?location=london">london, UK</Link>
                </li>
                <li>
                    <Link to="/?location=Tokyo">Tokyo, Japan</Link>
                </li>
                <li>
                    <Link to="/?location=Los Angeles">Los Angeles, U.S.A</Link>
                </li>
            </ol>
        </div>
    );
};

module.exports = Examples;