const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when a client connects
io.on('connection',socket =>{
    //logs here on the server
    // console.log("new web socket connected");

    //then emits the message which main.js (client) catches and displays
    //single client 
    //welcomes user
    socket.emit('message','welcome to chat cord!!!');

    //broadcast when a user connects
    //emit to everyone except the user thats connecting
    socket.broadcast.emit('message','a user has joined the chat');

    //broadcast to everyone all clients
    //io.emit();
    
    //runs when client disconnects
    socket.on('disconnect',() => {
        io.emit('message','A user has left the chat');
    });


    //listen for chat message from a client
    socket.on('chatMessage', (msg) => {
        console.log(msg);
        io.emit('message',msg);
    });

});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));