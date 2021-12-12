// controllers/frontpage.route.js
const express = require('express');
const router = express.Router();

router.get('/', frontpageRootAction);

// http://localhost:8000/menu
function frontpageRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.render("frontpage");
}

module.exports = router;