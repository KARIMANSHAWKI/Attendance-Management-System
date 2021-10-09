const user = JSON.parse(sessionStorage.getItem("username"));
console.log(user)
const _reportUrl = "../resource/dailyReport.json";
const _url = "../resource/employee.json";
const _monthelyReportUrl = "../resource/monthelyReport.json";
const attendsList = [];
var monthleyList = [];
var monthReportDate;
//a flag to prevent take excuse before the report is taken
var reportCreateFlag = false;

$(function(){



});






// functionality
//-------------------------------------------------------------------------

function takeAttends(_code, _time) {
  // reload the employee data to get employee name and Code
  $.ajax({
    url: "../resource/employee.json",
    type: "get",
    success: (emps) => {
      // check if code is in data or not
      index = emps.findIndex((employee) => {
        return employee.empCode == _code;
      });

      // if it exist then create and attends object for this employee which have the info and data
      if (index != -1) {
        const emp = {
          code: emps[index].empCode,
          name: emps[index].username,
          arrivedAt: { hour: _time.getHours(), minute: _time.getMinutes() },
        };

        // check if the employee alerady take his attends before and print message
        if (repted(_code)) {
          $("#AttendsInfoMessage").addClass("alert-danger");
          $("#AttendsInfoMessage").html(`Error: <br>
           Employee Attends is alerady token`);
          return;
        }

        // increment Attends Count
        attendsList.push(emp);
        incrementAttendsCount(_code);

        // display success message
        $("#AttendsInfoMessage").removeClass("alert-danger");
        $("#AttendsInfoMessage").html(`Success
        <br>The empolyee:  ${emp.name} <br>
        Arrive At:  ${_time.getHours()} : ${_time.getMinutes()}.`);
        // removeEmpFromAbsent(_code);
        removeEmpFromAbsent(_code);
        return;
      }

      // if empolyee is not founded display the code is invalid
      $("#AttendsInfoMessage").addClass("alert-danger");
      $("#AttendsInfoMessage").html(`Error: <br>
      Employee code is not founded`);
    },
    error: (e) => {
      console.log(e);
      $("#AttendsInfoMessage").addClass("alert-danger");
      $("#AttendsInfoMessage").text(`Error Falied To load DB`);
    },
  });
}

