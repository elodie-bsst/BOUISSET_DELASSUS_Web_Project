const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const session = require("express-session");
app.use(session({
    secret: "secretStringzsdvdgdgfdsbfs",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));

app.listen(process.env.WEB_PORT,
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);
app.get('/', (req, res) => {
    res.send('Hello, nodejs website...');
});

app.set("view engine", "ejs");
app.set("views", "views");
// MIDDLEWARE REGISTRATIONS!
// app.use(callback1, callback2, callback3)
// app.use(routeBase, callback)

app.use("/companies", require("./controllers/companies.route"));
app.use("/habitations", require("./controllers/habitations.route"));
app.use("/features", require("./controllers/features.route"));

const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + '/static'));


