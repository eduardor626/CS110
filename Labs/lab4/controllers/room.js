// Controller handler to handle functionality in room page
const roomGenerator = require('../util/roomIdGenerator.js');
const Messages = require("../models/Messages");


// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
    let roomName = request.params.roomName;
    Messages.find({ roomName: roomName })
        .lean()
        .then((items) => {
            response.render('room', {
                title: "chatroom",
                user: request.params.userName,
                roomName: request.params.roomName,
                messages: items,
                isAvailable: true,
            });
        });
}

function getMessages(request, response) {
    Messages.find().sort({ created_at: -1 }).lean().then((items) => {
        response.json(items);
    })
}

module.exports = {
    getRoom,
    getMessages
};