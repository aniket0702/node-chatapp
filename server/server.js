const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname+'/../public');

var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new connection');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'hello',
    createAt: new Date()
  });

  socket.on('createMessage', (message) => {
    console.log('createEmail', message);
  })

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});



server.listen(port, () => {
  console.log('app is up', port);
});
