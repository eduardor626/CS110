const Room = require('../models/Rooms');

function getHome(request, response) {
    Room.find().lean().then(items => {
        response.render('home', { title: 'home', rooms: items, isAvailable: true });
    });
}

//exports function 
module.exports = {
    getHome
};