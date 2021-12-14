// controllers/habitationsUser.route.js
const express = require('express');
const router = express.Router();

//only habitationsRepo is required
const habitationRepo = require('../utils/habitations.repository');

//to see habitations list and show each in details
router.get('/', habitationRootAction);
router.get('/list', habitationListAction);
router.get('/show/:habitationId', habitationShowAction);

// http://localhost:8000/habitationsUser
function habitationRootAction(request, response) {
    response.redirect("/habitationsUser/list");
}
async function habitationListAction(request, response) {
    var habitations = await habitationRepo.getAllHabitations();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("habitationsUser_list", { "habitations": habitations, "flashMessage": flashMessage });
}
async function habitationShowAction(request, response) {
    var oneHabitation = await habitationRepo.getOneHabitation(request.params.habitationId);
    response.render("habitationsUser_show", { "oneHabitation": oneHabitation });
}


module.exports = router;