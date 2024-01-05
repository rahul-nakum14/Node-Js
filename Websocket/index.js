const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {  //Handle Event From Frontend Which event here it is 'chat-message'
      io.emit('chat message', msg); // Sending Msg Or broadcast msg 
    // console.log('A new User Msg',msg); 
    });
  });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

server.listen(3000, () => {
    console.log('listening on *:3000');
  });