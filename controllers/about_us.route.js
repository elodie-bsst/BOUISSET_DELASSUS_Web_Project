// controllers/about_us.route.js
const express = require('express');
const router = express.Router();

router.get('/', about_usRootAction);

// http://localhost:8000/about_us
function about_usRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.render("about_us");
}



module.exports = router;