// controllers/login.route.js
const express = require('express');
const router = express.Router();

router.get('/', loginRootAction);

// http://localhost:8000/login
function loginRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.render("login");
}



module.exports = router;