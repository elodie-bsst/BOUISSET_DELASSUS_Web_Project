// controllers/admin.route.js
const express = require('express');
const router = express.Router();

//get the repositories which are needed
const companyRepo = require('../utils/companies.repository');
const featuresRepo=require('../utils/features.repository');
const habitationRepo=require('../utils/habitations.repository');


//actions for all
router.get('/', RootAction);
router.get('/list', ListAction);

// actions for companies
router.get('/companies/show/:compId', companyShowAction);
router.get('/companies/del/:compId', companyDelAction);
router.get('/companies/edit/:compId', companyEditAction);
router.post('/companies/update/:compId', companyUpdateAction);

//actions for features
router.get('/features/show/:featId', featureShowAction);
router.get('/features/del/:featId', featureDelAction);
router.get('/features/edit/:featId', featureEditAction);
router.post('/features/update/:featId', featureUpdateAction);

//actions for habitations
router.get('/habitations/show/:habitationId', habitationShowAction);
router.get('/habitations/del/:habitationId', habitationDelAction);
router.get('/habitations/edit/:habitationId', habitationEditAction);
router.post('/habitations/update/:habitationId', habitationUpdateAction);




function RootAction(request, response) {
    response.redirect("/admin/list");
}
async function ListAction(request, response) {
    var companies = await companyRepo.getAllCompanies();
	var features = await featuresRepo.getAllFeatures();
    var habitations = await habitationRepo.getAllHabitations();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("admin", { "companies": companies, "features": features, "habitations": habitations, "flashMessage": flashMessage });

}

//companies

async function companyShowAction(request, response) {
    var oneCompany = await companyRepo.getOneCompany(request.params.compId);
    response.render("companies_show", { "oneCompany": oneCompany });
}
async function companyEditAction(request, response) {
    var features = await featuresRepo.getAllFeatures();
    var compId = request.params.compId;
    if (compId!=="0")
        var company = await companyRepo.getOneCompany(compId);
    else
        var company = companyRepo.getBlankCompany();
    response.render("companies_edit", { "oneCompany": company, "features": features });
}
async function companyDelAction(request, response) {
    var numRows = await companyRepo.delOneCompany(request.params.compId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/admin/list");
}
async function companyUpdateAction(request, response) {
    var compId = request.params.compId;
    if (compId==="0") compId = await companyRepo.addOneCompany(request.body.company_speciality);
    var numRows = await companyRepo.editOneCompany(compId, 
        request.body.company_name,
        request.body.company_nb_employees, 
        request.body.company_location, 
        request.body.company_phone_number, 
        request.body.company_speciality);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/admin/list");
}


// features

async function featureShowAction(request, response) {
    var oneFeature = await featuresRepo.getOneFeature(request.params.featId);
    response.render("features_show", { "oneFeature": oneFeature });
}
async function featureEditAction(request, response) {
    var featId = request.params.featId;
    if (featId!=="0")
        var feature = await featuresRepo.getOneFeature(featId);
    else
        var feature = featuresRepo.getBlankFeature();
    response.render("features_edit", { "oneFeature": feature});
}
async function featureDelAction(request, response) {
    var numRows = await featuresRepo.delOneFeature(request.params.featId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/admin/list");
}
async function featureUpdateAction(request, response) {
    var featId = request.params.featId;
    if (featId==="0") featId = await featuresRepo.addOneFeature(featId); 
    var numRows = await featuresRepo.editOneFeature(featId, 
        request.body.feat_name, 
        request.body.feat_price, 
        request.body.feat_durability, 
        request.body.feat_intallation_cost,
        request.body.feat_rentability_per_year);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/admin/list");
}


//habitations

async function habitationShowAction(request, response) {
    var oneHabitation = await habitationRepo.getOneHabitation(request.params.habitationId);
    response.render("habitations_show", { "oneHabitation": oneHabitation });
}

async function habitationEditAction(request, response) {
    var habitationId = request.params.habitationId;
    if (habitationId!=="0")
        var habitation = await habitationRepo.getOneHabitation(habitationId);
    else
        var habitation = habitationRepo.getBlankHabitation();
    response.render("habitations_edit", { "oneHabitation": habitation});
}
async function habitationDelAction(request, response) {
    var numRows = await habitationRepo.delOneHabitation(request.params.habitationId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/admin/list");
}
async function habitationUpdateAction(request, response) {
    var habitationId = request.params.habitationId;
	if (habitationId==="0") habitationId = await habitationRepo.addOneHabitation(habitationId);
    var numRows = await habitationRepo.editOneHabitation(habitationId, 
        request.body.habitation_type, 
        request.body.habitation_size, 
        request.body.habitation_price,
        request.body.habitation_location, 
        request.body.habitation_sun_exposure);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/admin/list");
}


module.exports = router;