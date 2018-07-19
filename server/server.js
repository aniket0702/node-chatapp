const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname+'/../public');

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
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createEmail', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});



server.listen(port, () => {
  console.log('app is up', port);
});
