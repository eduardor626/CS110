const Room = require('../models/Rooms');


// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

//initialize fake DB to populate our home page
fakeDB = () => {
    return [
        { name: 'abcd' },
        { name: 'efgh' },
        { name: 'something' }
    ]
}

function getHome(request, response) {
    // PASS THE SCHEMA FROM DB TO THE HOME FUNCTION
    // .render() function is used to render a view and sends 
    // the rendered HTML string to the client.
    Room.find().lean().then(items => {
        //the first param is the .hbs we are accessing or rendering
        //the second is the elements i believe
        response.render('home', { title: 'home', rooms: items, isAvailable: true });
    });
}

//exports function 
module.exports = {
    getHome
};