// controllers/habitations.route.js
const express = require('express');
const router = express.Router();
const habitationRepo = require('../utils/habitations.repository');

router.get('/', habitationRootAction);
router.get('/list', habitationListAction);
router.get('/show/:habitationId', habitationShowAction);
router.get('/del/:habitationId', habitationDelAction);
router.get('/edit/:habitationId', habitationEditAction);
router.post('/update/:habitationId', habitationUpdateAction);

// http://localhost:8000/habitations
function habitationRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/habitations/list");
}
async function habitationListAction(request, response) {
    // response.send("LIST ACTION");
    var habitations = await habitationRepo.getAllHabitations();
    // console.log(habitations);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("habitations_list", { "habitations": habitations, "flashMessage": flashMessage });
}
async function habitationShowAction(request, response) {
    // response.send("SHOW ACTION");
    var oneHabitation = await habitationRepo.getOneHabitation(request.params.habitationId);
    response.render("habitations_show", { "oneHabitation": oneHabitation });
}
async function habitationEditAction(request, response) {
    // response.send("EDIT ACTION");
    var habitationId = request.params.habitationId;
    if (habitationId!=="0")
        var habitation = await habitationRepo.getOneHabitation(habitationId);
    else
        var habitation = habitationRepo.getBlankHabitation();
    response.render("habitations_edit", { "oneHabitation": habitation});
}
async function habitationDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for habitation, unless the habitation cannot be removed!!!
    var numRows = await habitationRepo.delOneHabitation(request.params.habitationId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/habitations/list");
}
async function habitationUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var habitationId = request.params.habitationId;
	if (habitationId==="0") habitationId = await habitationRepo.addOneHabitation(habitationId);
    var numRows = await habitationRepo.editOneHabitation(habitationId, 
        request.body.habitation_type, 
        request.body.habitation_size, 
        request.body.habitation_price,
        request.body.habitation_location, 
        request.body.habitation_sun_exposure);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/habitations/list");
}

module.exports = router;