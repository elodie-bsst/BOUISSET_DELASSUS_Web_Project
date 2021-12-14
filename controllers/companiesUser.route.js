// controllers/companiesUser.route.js
const express = require('express');
const router = express.Router();

//repositories which are needed
const companyRepo = require('../utils/companies.repository');
const featuresRepo=require('../utils/features.repository');

//users can only look company list and show in details companies
router.get('/', companyRootAction);
router.get('/list', companyListAction);
router.get('/show/:compId', companyShowAction);


// http://localhost:8000/companiesUser
function companyRootAction(request, response) {
    response.redirect("/companiesUser/list");
}
async function companyListAction(request, response) {
    var companies = await companyRepo.getAllCompanies();
	var features = await featuresRepo.getAllFeatures();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("companiesUser_list", { "companies": companies, "features": features, "flashMessage": flashMessage });
}
async function companyShowAction(request, response) {
    var oneCompany = await companyRepo.getOneCompany(request.params.compId);
    response.render("companiesUser_show", { "oneCompany": oneCompany });
}

module.exports = router;