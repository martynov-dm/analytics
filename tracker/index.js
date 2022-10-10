const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const Event = require('./schemas/event')

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/tracker',
        );

        console.log("Mongoose connected")
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/script.js"));
});

app.post("/track",  (req, res) => {
    Event.insertMany(req.body, { ordered: false }, (err, docs) => {
        if (err) console.log(err)
    })

    res.sendStatus(200)
});

app.listen(8001, err => {
    console.log('Listening on port 8001...');
});
