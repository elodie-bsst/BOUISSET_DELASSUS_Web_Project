// controllers/companies.route.js
const express = require('express');
const router = express.Router();
const companyRepo = require('../utils/companies.repository');

router.get('/', companyRootAction);
router.get('/list', companyListAction);
router.get('/show/:companyId', companyShowAction);
router.get('/del/:companyId', companyDelAction);
router.get('/edit/:companyId', companyEditAction);
router.post('/update/:companyId', companyUpdateAction);

// http://localhost:8000/companies
function companyRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/companies/list");
}
async function companyListAction(request, response) {
    // response.send("LIST ACTION");
    var companies = await companyRepo.getAllCompanies();
    // console.log(companies);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("companies_list", { "companies": companies, "flashMessage": flashMessage });
}
async function companyShowAction(request, response) {
    // response.send("SHOW ACTION");
    var oneCompany = await companyRepo.getOneCompany(request.params.companyId);
    response.render("companies_show", { "oneCompany": oneCompany });
}
async function companyEditAction(request, response) {
    // response.send("EDIT ACTION");
    var features = await companyRepo.getAllFeatures();
    var companyId = request.params.companyId;
    if (companyId!=="0")
        var company = await companyRepo.getOneCompany(companyId);
    else
        var company = companyRepo.getBlankCompany();
    response.render("companies_edit", { "oneCompany": company, "features": features });
}
async function companyDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for company, unless the company cannot be removed!!!
    var numRows = await companyRepo.delOneCompany(request.params.companyId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/companies/list");
}
async function companyUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var companyId = request.params.companyId;
    if (companyId==="0") companyId = await companyRepo.addOneCompany(request.body.company_speciality);
    var numRows = await companyRepo.editOneCompany(companyId, 
        request.body.company_name,
        request.body.company_nb_employees, 
        request.body.company_location, 
        request.body.company_phone_number, 
        request.body.company_speciality);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/companies/list");
}

module.exports = router;