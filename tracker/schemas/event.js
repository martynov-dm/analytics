const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ts: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event
