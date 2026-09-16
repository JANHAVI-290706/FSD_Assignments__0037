const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        name: "Janhavi",
        course: "BCA",
        photo: "https://picsum.photos/200"
    });
});

module.exports = app;