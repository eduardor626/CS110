// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

function getHome(request, response) {
    
    // do any work you need to do, then

    // .render() function is used to render a view and sends 
    // the rendered HTML string to the client.

    //the first param is the .hbs we are accessing or rendering
    //the second is the elements i believe
    console.log("Home got a hit");
    response.render('home', { title: 'home'});

}
//exports function 
module.exports = {
    getHome
};