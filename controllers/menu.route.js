const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
    response.render("menu_view", { content: [] });
});

/*router.get("/world", function (request, response) {
    response.render("menu_view", { content: [
        { "category": "cheese",  "message": "raclette" },
        { "category": "drink", "message": "cidre" },
        { "category": "color", "message": "green" },
    ] });
});*/

// add after SESSION+USER

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), adminAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

async function userAction(request, response) {
  let userData = await userRepo.getOneUser(request.user.user_name);
  var userJson = JSON.stringify(userData)
  var myContent=[];
  myContent.push({ "category": "method",  "message": "USER" });
  myContent.push({ "category": "userdata",  "message": userJson });
  response.render("menu_view", { "content": myContent });
}

async function adminAction(request, response) {
  let userData = await userRepo.getOneUser(request.user.user_name);
  var userJson = JSON.stringify(userData)
  var myContent=[];
  myContent.push({ "category": "method",  "message": "ADMIN" });
  myContent.push({ "category": "userdata",  "message": userJson });
  response.render("menu_view", { "content": myContent });
}


function protectedGetAction(request, response) {
  if (request.isAuthenticated()) {
    if (request.user.user_role === "ADMIN") {
      response.redirect("/menu/admin");
    } else {
      response.redirect("/menu/user");
    }
  } else {
      response.redirect("/menu");
  }
}

async function loginPostAction(request, response) {
  areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

  if (areValid) {
    user = await userRepo.getOneUser(request.body.username);
    await request.login(user, function (err) { 
        if (err) { return next(err); }
    });
    if (request.user.user_role === "ADMIN") {
      return response.redirect("/menu/admin");
    } else {
      return response.redirect("/menu/user");
    }

  } else {
    response.send("Invalid credentials provided");
  }
}

function logoutAction(request, response) {
  request.logOut();
  response.redirect("/menu");
  
}



module.exports = router;