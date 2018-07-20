var socket = io();
socket.on('connect', () => {
  console.log('connected to server');
  // socket.emit('createMessage', {
  //   to: 'aniket',
  //   text: 'hello'
  // });
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

socket.on('newMessage', (message) => {
  console.log('new message', message);
  var li =jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target ="_blank">My current Location</a>');
  li.text(`${message.from}`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function() {
    jQuery('[name=message]').val('');
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation for this brower not suppoted');
  }
  locationButton.attr('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled');
    socket.emit('createLocationMessage', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
    console.log(position);
  }, function() {
    locationButton.removeAttr('disabled');
    alert('unable to fetch location');
  })
})
