var userName = JSON.parse(sessionStorage.getItem("emp_userName"));
var password = JSON.parse(sessionStorage.getItem("emp_password"));

var empNames = [];

$(document).ready(function () {
    $(".adminName").text(userName);

    // ************************** Swich NavSide Icons *************************/
    $(".navSide li:nth-child(1) a").removeClass("active");
    $(".navSide li:nth-child(1) a").click(function () {
        $(".profilInterface").hide(500);
        $(".inf-body").hide(600);
        $(".req-body").hide(600)
        $(".reports").show(600);
        $(".navSide li:nth-child(2) a").removeClass("active");
        $(".navSide li:nth-child(3) a").removeClass("active");
        $(this).addClass("active");
    });

    $(".navSide li:nth-child(2) a").click(function () {
        $(".profilInterface").hide(200);
        $(".reports").hide(600);
        $(".req-body").hide(600)
        $(".inf-body").show(600);
        $(".navSide li:nth-child(1) a").removeClass("active");
        $(".navSide li:nth-child(3) a").removeClass("active");
        $(this).addClass("active");
    });

    $(".navSide li:nth-child(3) a").click(function () {
        $(".profilInterface").hide(500);
        $(".inf-body").hide(600);
        $(".reports").hide(600);
        $(".req-body").show(600);
        $(".navSide li:nth-child(1) a").removeClass("active");
        $(".navSide li:nth-child(2) a").removeClass("active");
        $(this).addClass("active");
    });

    $(".userWelcom").text(userName);

    //**************** Reports Card ***************************//
    $("#item-one").click(function () {
        $("#excuseCard").hide(500);
        $("#abscentCard").hide(500);
        $("#monthlyCard").hide(500);
        $("#attendCard").show(500)
    });
    $("#item-tow").click(function () {
        $("#attendCard").hide(500);
        $("#abscentCard").hide(500);
        $("#monthlyCard").hide(500);
        $("#excuseCard").show(500);
    });

    $("#dailyTab").click(function () {
        $(this).addClass('active');
        $("#monthlyTab").removeClass("active");
    });

    $("#item-three").click(function () {
        $("#attendCard").hide(500)
        $("#excuseCard").hide(500);
        $("#monthlyCard").hide(500);
        $("#abscentCard").show(500);

    });

    $("#monthlyTab").click(function () {
        $("#attendCard").hide(500)
        $("#excuseCard").hide(500);
        $("#abscentCard").hide(500);
        $("#monthlyCard").show(500);
        $("#dailyTab").removeClass("active");
        $(this).addClass("active");
    });



    //************************* Monthly Report ************************//
    $.getJSON("../json/monthlyReport.json", function (data) {

        let innerData = data[0].employees;
        let empRepMonth = '';
        console.log(innerData.length)
        for (let i = 0; i < innerData.length; i++) {

            empRepMonth += '<tr>';
            empRepMonth += '<td>' + innerData[i].name + '</td>';
            empRepMonth += '<td>' + data[0].date + '</td>';
            empRepMonth += '<td>' + innerData[i].attendsCount + '</td>';
            empRepMonth += '<td>' + innerData[i].excuseCount + '</td>';
            empRepMonth += '<td>' + innerData[i].absentCount + '</td>';
            empRepMonth += '<td>' + innerData[i].late + '</td>';
            empRepMonth += '</tr>';
            empNames.push(innerData[i].name);
        }
        $("#monthlyReportRows").append(empRepMonth);

    });


    //************************* Daily Report ************************//
    let currentDay;
    $.getJSON("../json/dailyReport.json", function (data) {
       


        currentDay = data[data.length - 1];
        let attendData = '';
        let attendance = currentDay.attends;
      
        let absentData = '';
        let absence = currentDay.absent;
        
        let excuseData = '';
        let excuse = currentDay.excuse;
      
        for(let i=0; i<excuse.length; i++) {
            excuseData += '<tr>';
            excuseData += '<td>'+currentDay.date    +'</td>';
            excuseData += '<td>'+excuse[i].name+'</td>';
            excuseData += '<td>'+excuse[i].time.hour+' : '+excuse[i].time.minute+'am</td>';
            excuseData+='</tr>';
        }
        $("#ExcusedToday").append(excuseData);

        for(let i=0; i<absence.length; i++) {
            absentData += '<tr>';
            absentData += '<td>'+currentDay.date    +'</td>';
            absentData += '<td>'+absence[i].name+'</td>';
            absentData += '<td>'+absence[i].arrivedAt.hour+'</td>';
            absentData+='</tr>';
        }
        $("#AbscentsToday").append(absentData);

        for(let i=0; i<attendance.length; i++) {
            attendData += '<tr>';
            attendData += '<td>'+currentDay.date    +'</td>';
            attendData += '<td>'+attendance[i].name+'</td>';
            attendData += '<td>'+attendance[i].arrivedAt.hour+':'+attendance[i].arrivedAt.minute+'am</td>';
            attendData+='</tr>';
        }
        $("#AttendantsToday").append(absentData);
    });
    
});

// ************************ Employee Data ************************* //

$.getJSON("../json/employees.json", function (data) {
    console.log(data.length)
    let empRepMonth = '';
    for (let i = 0; i < data.length; i++) {
        empRepMonth += '<tr>';
        empRepMonth += '<td>' + data[i].username + '</td>';
        empRepMonth += '<td>' + data[i].empCode + '</td>';
        empRepMonth += '<td>' + data[i].email + '</td>';
        empRepMonth += '<td>' + data[i].address + '</td>';
        empRepMonth += '<td>' + data[i].age + '</td>';
        empRepMonth += '</tr>';
    }

    $("#impInfo").append(empRepMonth);


    // ************************ Rquests Part ************************ //
    // 1- put number of requests in notification icon
    let arrRequest = loadRequestList();
    $("#reqNum").text(arrRequest.length);
    let reqRow = '';

    // 2- put requests information in table body 
    for (let i = 0; i < arrRequest.length; i++) {
        reqRow += '<tr class="rowEmpty">';
        reqRow += '<td>' + arrRequest[i].username + '</td>';
        reqRow += '<td>' + arrRequest[i].password + '</td>';
        reqRow += '<td>' + arrRequest[i].email + '</td>';
        reqRow += '<td>' + arrRequest[i].age + '</td>';
        reqRow += '<td>' + arrRequest[i].address + '</td>';
        reqRow += '<td><buuton class="btn btn-primary" id="accept">Accept</button></td>';
        reqRow += '<td><buuton class="btn btn-danger">Reject</button></td>';
        reqRow += '</tr>';
    }
    $("#RequestTable").append(reqRow);

    // 3- get employee data from json file
    let _url = "../json/employees.json";
    let arr = [];
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            arr = data;
        },
        error: function err() {
            console.log("Error Mesage!!");
        }
    });
    arr = data;

    // 4 - incase accept request add employee to json file and delete it from loacl storage
    $(".btn-primary").click(function () {
        catchTr = $(this).parent().parent();
        acceptedUsername = catchTr.children()[0].innerText;
        acceptedPassword = catchTr.children()[1].innerText;
        acceptedEmail = catchTr.children()[2].innerText;
        acceptedAge = catchTr.children()[3].innerText;
        acceptedAdrees = catchTr.children()[4].innerText;
        empCode = Math.floor(Math.random() * 1000);

        empAccepted = new Employee(acceptedUsername, acceptedPassword, acceptedEmail, acceptedAge, acceptedAdrees, empCode);
        arr.push(empAccepted);
        $(this).parent().parent().fadeOut(1000);
        if (arrRequest.length == 1) {
            $("#reqNum").text("0");
        } else {
            $("#reqNum").text(--arrRequest.length);
        }
       
        saveJson(arr);
    });

    $(".btn-danger").click(function () {
        $(this).parent().parent().fadeOut(1000);
        if (arrRequest.length > 1) {
            $("#reqNum").text(--arrRequest.length);
        } else {
            $("#reqNum").text("0");
        }
    });
});

// ******************* 1- Get All REquest FRom Local Storage *************** //
function loadRequestList() {
    return JSON.parse(localStorage.getItem("requestList"));
}

// ******************* save accepted employee data in json file ************ //
function getAdminInfo() {
    return JSON.parse(sessionStorage.getItem("employee"));
}

function saveJson(jsonDataToSave) {
    var data = new Blob([JSON.stringify(jsonDataToSave)], {
      type: "application/json",
    });
    var link = document.createElement("a");
    link.href = window.webkitURL.createObjectURL(data);
    link.setAttribute("download", "employee.json");
    link.click();
  }
//   ************************** Repeated Data *****************/
function repeatdata() {
    for (i = 0; i < arr.length; i++) {
        if (arr[i].username == acceptedUsername && arr[i].address == acceptedAdrees && arr[i].email == acceptedEmail && arr[i].age == acceptedAge) {
            return true;
        }
    }
}










