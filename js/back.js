// //....................first login form
// // Login_btn = document.getElementById('loginSubmit');
// login_btn = $("#loginSubmit");
// // User_btn = document.getElementById('loginUser');
// user_btn = $("#loginUser");
// // User_class = document.querySelector('.user-class');
// user_class = $(".user-class");
// // loginPassword = document.getElementById('loginPassword');
// loginpassword = $("#loginPassword");
// // Pass_class = document.querySelector('.user-pass');
// pass_class = $(".user-pass");

// //Login_btn.addEventListener("click", function(e) {
// login_btn.click(function(e) {
//     e.preventDefault();
//     if (!(passWordNotValid() && logNameValid())) {
//         if (!logNameValid()) {
//             user_class.removeClass("success");
//             user_class.addClass("error");
//         } else {
//             user_class.removeClass("error");
//             user_class.addClass("success");
//         }

//         if (!logPassValid()) {
//             pass_class.removeClass("success");
//             pass_class.addClass("error");
//         } else {
//             pass_class.removeClass("error");
//             pass_class.addClass("success");
//         }
//     } else {
//         console.log("hello");
//     }


// }); //end of login test

// function logNameValid() {
//     var userPattern = /^[A-Za-z]{3,20}$/;
//     return user_btn.val.match(userPattern);
// } //End of name validation

// function logPassValid() {
//     var passPattern = /^(?=.*[0-9])	$/;
//     return loginPassword.val.match(passPattern);


// } //End of password validation