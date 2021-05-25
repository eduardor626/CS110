//this is how we give our data base a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    roomName: {
        type: String
    }
});

module.exports = Item = mongoose.model("messages", MessageSchema);