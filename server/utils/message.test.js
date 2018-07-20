var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message object', () => {
    var from = 'aniket';
    var text = 'some message';
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
      var from = 'aniket';
      var lon = 15;
      var lat = 19;
      var url = 'https://www.google.com/maps?q=19,15'
      var message = generateLocationMessage(from, lat, lon);
      expect(message).toInclude({from, url});
  });
});
