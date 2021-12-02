// controllers/features.route.js
const express = require('express');
const router = express.Router();
const featureRepo = require('../utils/features.repository');

router.get('/', featureRootAction);
router.get('/list', featureListAction);
router.get('/show/:featureId', featureShowAction);
router.get('/del/:featureId', featureDelAction);
router.get('/edit/:featureId', featureEditAction);
router.post('/update/:featureId', featureUpdateAction);

// http://localhost:8000/features
function featureRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/features/list");
}
async function featureListAction(request, response) {
    // response.send("LIST ACTION");
    var features = await featureRepo.getAllFeatures();
    // console.log(features);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("features_list", { "features": features, "flashMessage": flashMessage });
}
async function featureShowAction(request, response) {
    // response.send("SHOW ACTION");
    var oneFeature = await featureRepo.getOneFeature(request.params.featureId);
    response.render("features_show", { "oneFeature": oneFeature });
}
async function featureEditAction(request, response) {
    // response.send("EDIT ACTION");
    var featureId = request.params.featureId;
    if (featureId!=="0")
        var feature = await featureRepo.getOneFeature(featureId);
    else
        var feature = featureRepo.getBlankFeature();
    response.render("features_edit", { "oneFeature": feature});
}
async function featureDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for feature, unless the feature cannot be removed!!!
    var numRows = await featureRepo.delOneFeature(request.params.featureId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/features/list");
}
async function featureUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var featureId = request.params.featureId;
    var numRows = await featureRepo.editOneFeature(featureId, 
        request.body.feat_name, 
        request.body.feat_price, 
        request.body.feat_durability,
        request.body.feat_installation_cost, 
        request.body.feat_rentability_per_year);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/features/list");
}

module.exports = router;