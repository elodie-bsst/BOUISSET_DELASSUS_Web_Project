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

const auth = require("./utils/users.auth");
auth.initialization(app);

app.listen(process.env.WEB_PORT,
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);
app.get('/', (req, res) => {
    res.send('Hello, nodejs website...');
});

app.set("view engine", "ejs");
app.set("views", "views");


const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use("/menu", require("./controllers/menu.route"));
app.use("/frontpage", require("./controllers/frontpage.route"));
app.use("/about_us", require("./controllers/about_us.route"));
app.use("/admin", require("./controllers/admin.route"));
app.use("/companiesUser", require("./controllers/companiesUser.route"));
app.use("/featuresUser", require("./controllers/featuresUser.route"));
app.use("/habitationsUser", require("./controllers/habitationsUser.route"));

app.use("/static", express.static(__dirname + '/static'));


