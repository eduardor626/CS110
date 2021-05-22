// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

//For connecting to the mongoDB database
const mongoose = require('mongoose');
const config = require('config');
const Room = require('./models/Rooms');

const path = require('path');
const socketio = require('socket.io');
const http = require('http');


// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const Server = http.createServer(app);
const io = socketio(Server);
const port = 8080;


//connecting to DB
const db = config.get('mongoURI');


mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', socket => {
    console.log("New WS Connection...");

    socket.emit('message', 'Welcome to the Sam Chat');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client Disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });  

    // Listen for ChatMessage
    socket.on('chatMessage', (msg) => {
    //    console.log(msg);
        io.emit('message', msg);
    });
})



// dummy way to see all the rooms and do things with it or display on front end
app.get('/getRooms', function(req, res) {
    Room.find().lean().then(items => {
        res.json(items);
    });
});

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);


// respond to /roomName
app.post('/roomName', (req, res) => {
    // res.redirect() function redirects to the URL derived from the specified path,
    console.log(req.body.createroom + "<---");

    if (!req.body.createroom) {
        console.log("its empty");
        res.redirect(req.body.room);
    } else {
        const newRoom = new Room({
            name: req.body.createroom
        })
        newRoom.save().then(console.log('room added'))
        res.redirect(newRoom.name);
    }
});



// NOTE: This is the sample server.js code we provided, feel free to change the structures
Server.listen(port, () => console.log(`Server listening on http://localhost:${port}`));