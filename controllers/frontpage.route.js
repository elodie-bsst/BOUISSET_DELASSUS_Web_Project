// controllers/frontpage.route.js
const express = require('express');
const router = express.Router();

router.get('/', frontpageRootAction);

// http://localhost:8000/frontpage
function frontpageRootAction(request, response) {
    response.render("frontpage");
}

module.exports = router;