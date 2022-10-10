const express = require("express");
const path = require("path");
const app = express();


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/1.html'));
});


app.listen(8000, err => {
    console.log('Listening on port 8000...');
});
