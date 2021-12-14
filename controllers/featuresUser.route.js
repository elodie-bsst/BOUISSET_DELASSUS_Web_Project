// controllers/featuresUser.route.js
const express = require('express');
const router = express.Router();

//only featureRepo is require
const featureRepo = require('../utils/features.repository');

//only to see feature list and show each feature in details
router.get('/', featureRootAction);
router.get('/list', featureListAction);
router.get('/show/:featId', featureShowAction);

// http://localhost:8000/featuresUser
function featureRootAction(request, response) {
    response.redirect("/featuresUser/list");
}
async function featureListAction(request, response) {
    var features = await featureRepo.getAllFeatures();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("featuresUser_list", { "features": features, "flashMessage": flashMessage });
}
async function featureShowAction(request, response) {
    var oneFeature = await featureRepo.getOneFeature(request.params.featId);
    response.render("featuresUser_show", { "oneFeature": oneFeature });
}


module.exports = router;