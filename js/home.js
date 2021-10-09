$(document).ready(function() {
    ////////////Swich Between Login Page And Register Page//////////////////
    $('#regLink').on('click', function() {
        $('.register').show(1000);
        $('.login').hide(1000);
    });

    $('#loginLink').on('click', function() {
        $('.login').show(1000);
        $('.register').hide(1000);
    });

    ///////////////////////Form Validation and Check If user Existing /////////////////////////
    user_class = $(".user-class");
    pass_class = $(".user-pass");
    Login_btn = $('#loginForm');
    userBtn = $("#loginUser");
    passBtn = $("#loginPassword");
    var userbtnVal;
    var passbtnVal;

    $('#loginForm').submit(function(e) {

        e.preventDefault();
        if ($('#loginForm')[0].checkValidity() === false) {
            user_class.removeClass('success');
            user_class.addClass('error');
            pass_class.removeClass('success');
            pass_class.addClass('error');

        } else {
            user_class.removeClass('error');
            user_class.addClass('success');
            pass_class.removeClass('error');
            pass_class.addClass('success');

            userbtnVal = $("#loginUser").val();
            passbtnVal = $("#loginPassword").val();



            $.getJSON("../json/employees.json", function(data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].username === userbtnVal && data[i].password) {
                        window.location.replace("../html/profile.html");
                        sessionStorage.setItem("emp_userName", JSON.stringify(userbtnVal));
                        sessionStorage.setItem("emp_password", JSON.stringify(passbtnVal));
                    }
                }

            });

            $.getJSON("../json/admin.json", function(data) {
                adminPass = data[0].password;
                adminName = data[0].username;

                if (adminName === userbtnVal && adminPass === passbtnVal) {
                    sessionStorage.setItem("emp_userName", JSON.stringify(userbtnVal));
                    sessionStorage.setItem("emp_password", JSON.stringify(passbtnVal));
                    window.location.replace("admin.html");
                }
            });
        }
    });

    //...............................Scond Register form
    Register_user = $('.reg_user');
    Register_pass = $('.reg_pass');
    Register_email = $('.reg_email');
    Register_address = $('.reg_address');
    Register_age = $('.reg_age');
    Register_submit = $('#regSubmit');
    Register_form = $('#regForm');

    rgUser = $('#regUser');
    rgPass = $('#regPassword');
    rgMail = $('#regEmail');
    rgAddress = $('#regAddress');
    rgAge = $('#age');


    $('#regSubmit').click(function(e) {
        e.preventDefault();
        // alert("hello")

        if ($('#regForm')[0].checkValidity() === false) {
           
            Register_user.removeClass('success');
            Register_user.addClass('error');
            Register_pass.removeClass('success');
            Register_pass.addClass('error');
            Register_email.removeClass('success');
            Register_email.addClass('error');
            Register_address.removeClass('success');
            Register_address.addClass('error');
            Register_age.removeClass('success');
            Register_age.addClass('error');
            // alert("false");
        } else {
            // Register_user.removeClass('error');
            // Register_user.addClass('success');
            // Register_pass.removeClass('error');
            // Register_pass.removeClass('success');
            // Register_email.removeClass('error');
            // Register_email.addClass('success');
            // Register_address.removeClass('error');
            // Register_address.addClass('success');
            // Register_age.removeClass('error');
            // Register_age.addClass('success');

            regUserVal = rgUser.val();
            regPassVal = rgPass.val();
            regMailal = rgMail.val();
            rgAddressVal = rgAddress.val();
            rgAgeVal = rgAge.val();

            emp = new Employee(regUserVal, regPassVal, regMailal, rgAddressVal, rgAgeVal);
            var requestArr = loadCurrentRequest();
            requestArr.push(emp);
            localStorage.setItem("requestList", JSON.stringify(requestArr));
            alert("your request is sended, please wait for admin permission");
            $('.register').hide(1000);
            $('.login').show(1000);
        }
        $('#regForm').addClass("was-validated");
    });

}); //end of load document


function loadCurrentRequest() {
    return (users = JSON.parse(localStorage.getItem("requestList") || "[]"));
  }
