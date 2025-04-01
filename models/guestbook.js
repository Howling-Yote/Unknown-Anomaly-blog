const mongoose = require('mongoose');

const guestbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homepage: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('GuestbookEntry', guestbookSchema);