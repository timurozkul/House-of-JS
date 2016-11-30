var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Clock = require('Clock');
// Groups your test and allows your to name them
describe('Clock', () => {
    it('should exist', () => {
        expect(Clock).toExist();
    });
});

describe('render', () => {
    it('should render clock to output', () => {
        var clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);
        // $el store the root of our compnent in terms of dom
        // ReactDOM.findDOMNode - Converts component to the actual html
        var $el = $(ReactDOM.findDOMNode(clock));
        var actualText = $el.find('.clock-text').text();
        expect(actualText).toBe('01:02');
    });
});

describe('formatSeconds', () => {
    it('should format seconds', () => {
        // Renders and returns
        var clock = TestUtils.renderIntoDocument(<Clock/>);
        var seconds = 615;
        var expected = '10:15';
        var actual = clock.formatSeconds(seconds);

        expect(actual).toBe(expected);
    });
});

describe('should format seconds when min/sec are less than 10', () => {
    it('should format seconds', () => {
        // Renders and returns
        var clock = TestUtils.renderIntoDocument(<Clock/>);
        var seconds = 61;
        var expected = '01:01';
        var actual = clock.formatSeconds(seconds);

        expect(actual).toBe(expected);
    });
});