const button = document.querySelector("#delbutton");
button.addEventListener("click", () =>{
    alert("The implemented login is not completely secure. We have nevertheless chosen to be able to redirect the administrator to the admin page via this button. In theory the user should not be able to access this page, only the admin can.");;
})