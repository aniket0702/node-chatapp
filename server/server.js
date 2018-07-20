const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname+'/../public');

const {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 9000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new connection');
  //
  // socket.emit('newMessage', {
  //   from: 'mike',
  //   text: 'hello',
  //   createAt: new Date()
  // });
  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat page'));
  socket.broadcast.emit('newMessage',generateMessage('admin', 'new user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
  socket.on('createLocationMessage' , (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});



server.listen(port, () => {
  console.log('app is up', port);
});
