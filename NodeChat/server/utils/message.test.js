const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate corect message object', () => {
		const from = 'james',
			  text = 'Hello world',
		      message = generateMessage(from, text);

		expect(message).toInclude({from, text});
		expect(message.createdAt).toBeA('number');
	});
});