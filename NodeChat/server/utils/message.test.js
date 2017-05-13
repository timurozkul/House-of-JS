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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Deb';
    const latitude = 15;
    const longitude = 19;
    const url = 'https://www.google.com/maps?q=15,19';
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
