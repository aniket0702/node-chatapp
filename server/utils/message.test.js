var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message object', () => {
    var from = 'aniket';
    var text = 'some message';
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
