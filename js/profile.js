var userName = JSON.parse(sessionStorage.getItem("emp_userName"));
var password = JSON.parse(sessionStorage.getItem("emp_password"));


$(function() {
    //define which user subadmin or normal employee
    if (userName == null || password == null) {
        $("#authentication").show();
        $(profile_container).hide();
    } else if (userName != "Noah") {
        $("#profile_title").text("Acount");
        $("#emp_name").text(userName);
    } else {
        $("#profile_title").text("Sub Admin");
        $("#emp_name").text(userName);
        $(".fa-clock-o").show();
    } 
    $("#emp_name").click(function(){
        window.location.replace("../html/home.html");
    })

// ************************** Swich NavSide Icons *************************/
$(".navSide li:nth-child(1) a").removeClass("active");
$(".navSide li:nth-child(1) a").click(function(){
    $(".profilInterface").hide(500);
        $(".inf-body").hide(600);
        $(".attend-body").hide(600);
        $(".reports").show(600);
        $(".navSide li:nth-child(2) a").removeClass("active");
        $(".navSide li:nth-child(3) a").removeClass("active");
        $(this).addClass("active");
   });
   
$(".navSide li:nth-child(2) a").click(function(){
        $(".profilInterface").hide(200);
        $(".reports").hide(600);
        $(".attend-body").hide(600);
        $(".inf-body").show(600);
        $(".navSide li:nth-child(1) a").removeClass("active");
        $(".navSide li:nth-child(3) a").removeClass("active");
        $(this).addClass("active");
    });
$(".navSide li:nth-child(3) a").click(function(){
        $(".profilInterface").hide(200);
        $(".reports").hide(600);
        $(".inf-body").hide(600);
        $(".attend-body").show(600);
        $(".navSide li:nth-child(2) a").removeClass("active");
        $(".navSide li:nth-child(1) a").removeClass("active");
        $(this).addClass("active");
    });

 
    $(".userWelcom").text(userName);

       //**************** Reports Card ***************************//
       $("#dailyTab").click(function(){
       $("#monthlyCard").hide(500);
       $("#dailyCard").show(500);
       $("#monthlyTab").removeClass("active");
       $(this).addClass("active");
   });

   $("#monthlyTab").click(function(){
       $("#dailyCard").hide(500);
       $("#monthlyCard").show(500);
       $("#dailyTab").removeClass("active");
       $(this).addClass("active");
});

    // ***************** monthly report *********************//
    $.getJSON("../json/monthlyReport.json", function(data) {
        let innerData= data[0].employees;
        let empRepMonth = '';
            for(let i=0; i<innerData.length; i++) {
                if(data[0].employees[i].name === userName) {
                    empRepMonth += '<tr>';
                    empRepMonth += '<td>' +data[0].date + '</td>';
                    empRepMonth += '<td>' + innerData[i].attendsCount + '</td>';
                    empRepMonth += '<td>' + innerData[i].excuseCount + '</td>';
                    empRepMonth += '<td>' + innerData[i].absentCount + '</td>';
                    empRepMonth += '</tr>';
                    
                    $("#monthlyReportRows").append(empRepMonth);
                }
            }    
        });


        // ***************** Daily Report *************************//
        let currentDay;
        $.getJSON("../json/dailyReport.json", function(data) {
    
            currentDay = data[data.length-1];
            let empRepMonth = '';
            empRepMonth += '<tr>';
            empRepMonth += '<td>' +currentDay.date+ '</td>';
    
            for (let i=0; i<currentDay.attends.length; i++) {
                if(currentDay.attends[i].name === userName){
                    empRepMonth += '<td> Arrive At' +currentDay.attends[i].arrivedAt[0].hour+ '</td>';
                    console.log(currentDay.attends[i].arrivedAt)
                } 
            }
           
    
            for (let i=0; i<currentDay.absent.length; i++) {
                if(currentDay.absent[i].name === userName){
                    empRepMonth += '<td>' +currentDay.absent[i].arrivedAt+ '</td>';
                    console.log(currentDay.absent[i].arrivedAt);
                    
                } 
            }

            for (let i=0; i<currentDay.late.length; i++) {
                if(currentDay.late[i].name === userName){
                    empRepMonth += '<td> late and arrive at ' +currentDay.late[i].arrivedAt.hour+':'+currentDay.late[i].arrivedAt.minute+ '</td>';
                    console.log(currentDay.absent[i].arrivedAt);
                    
                } 
            }
            $("#dailyReportRows").append(empRepMonth);
            });

        //******************* Show Employee Info *******************//
        $.getJSON("../json/employees.json", function(data) {
            let empInfo = '';
                for(let i=0; i<data.length; i++) {
                    if(data[i].username === userName) {
                        empInfo += '<tr>';
                        empInfo += '<td>' +data[i].username + '</td>';
                        empInfo += '<td>' + data[i].email + '</td>';
                        empInfo += '<td>' + data[i].empCode + '</td>';
                        empInfo += '<td>' + data[i].address + '</td>';
                        empInfo += '<td>' + data[i].age + '</td>';
                        empInfo += '</tr>';
                        
                        $("#empData").append(empInfo);
                    }
                }    
            }); 
});