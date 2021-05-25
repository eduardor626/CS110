// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

//For connecting to the mongoDB database
const mongoose = require('mongoose');
const config = require('config');
const Room = require('./models/Rooms');
const Messages = require('./models/Messages');

const path = require('path');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connecting to DB
const db = config.get('mongoURI');

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route
app.use(express.static(path.join(__dirname, 'public')));






app.post('/postMessage', function(req, res) {
    //write to database the message
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const newMessage = new Messages({
        roomName: req.body.chatroom_name,
        username: req.body.user_name,
        text: req.body.msg,
        created_at: new Date().toLocaleDateString("en-US", options),
    });

    newMessage
        .save()
        .then((item) => {
            console.log("message added");
            console.log(item);
        })
        .catch((e) => console.log(e));

});

// respond to /roomName
app.post('/create', (req, res) => {
    // res.redirect() function redirects to the URL derived from the specified path,
    if (!req.body.createroom) {
        const newRoom = new Room({
            name: req.body.room,
            user: req.body.userName
        });
        console.log(req.body.userName);
        res.redirect(newRoom.name + "/" + req.body.userName);
    } else {
        const newRoom = new Room({
            name: req.body.createroom,
        });
        newRoom.save().then(console.log('room added'))
        res.redirect(newRoom.name + "/" + req.body.userName);
    }
});


// dummy way to see all the rooms and do things with it or display on front end
app.get('/getRooms', function(req, res) {
    Room.find().lean().then(items => {
        res.json(items);
    });
});


// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/getMessages', roomHandler.getMessages);
app.get('/:roomName/:userName', roomHandler.getRoom);
app.get('/:roomName', roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));