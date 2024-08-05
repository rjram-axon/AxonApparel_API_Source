var Userid = 0;
var UserName = 0;
var time = "";
var Password = '';
var machinename = '';
$(document).ready(function () {
    debugger;

    GetSessionID();
    // SessionExpireAlert(60000);
    $('#mpeTimeout').modal('hide');
    // SessionExpireAlert(60 * 60 * 1000)
    SessionExpireAlert(26* 60 * 1000);
    Userid = $("#hdnLoginUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Password = $("#hdnuserpassword").data('value');
    machinename = $("#hdnmachinename").data('value');
    if (Userid == null || Userid == "") {
        window.location.href = '/Login/LoginIndex';
    }

    window.addEventListener("storage", myFunction);

    function myFunction(event) {
        //debugger;
        if (event.newValue == 'cleartimeout') {
            clearTimeout(time);           
            time = null;
            localStorage.setItem('status', 'login');
        }
        if (event.newValue == 'logout') {
            window.location = "../Login/LoginIndex";      
        }
    }
    var login = 'login';
    localStorage.setItem('status',login);

    $.ajax({
        url: "/Login/GetLoginstatus",
        data: JSON.stringify({ UserName: UserName, Password: Password }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (obj != undefined) {
                if (obj.LoginStatus != 'Y') {
                    debugger;
                    window.location = "../Login/LoginIndex";
                    alert("Your Session has expired");
                }
            }
        }
    });
});

function SessionExpireAlert(timeout) {
    var seconds = timeout / 1000;
    //if (timeout !=null) {
    //    clearTimeout(timeout);
    //    //startTimer();
    //}
    //alert(seconds);
     //document.getElementsByName("secondsIdle").innerHTML = seconds;

    //document.getElementsByName("seconds").innerHTML = seconds;
    //setInterval(function () {
    //    alert(seconds);
    //    seconds--;
    //   document.getElementById("seconds").innerHTML = seconds;
    //   document.getElementById("secondsIdle").innerHTML = seconds;
    //}, timeout/3);

    time = setTimeout(function () {
        debugger;
        //alert(seconds);
        //    seconds--;
        //  document.getElementById("seconds").innerHTML = seconds;
        //  document.getElementById("secondsIdle").innerHTML = seconds;
        $.ajax({
            url: "/Login/TimeoutLoginStatus",
            data: JSON.stringify({ Username: UserName, Password: Password, Loginstatus: 'N', MachineName: machinename }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                localStorage.setItem('status', 'logout');
                window.location = "../Login/LoginIndex";
            }
        });
    }, timeout/2);
    document.addEventListener("mousemove", ResetTimer);
    document.addEventListener("keypress", ResetTimer);
};

function ResetSession() {
    //Redirect to refresh Session.
    window.location = window.location.href;
}
function ResetTimer() {
    clearTimeout(time);
    SessionExpireAlert(26 * 60 * 1000);
    localStorage.setItem('status', 'cleartimeout');
}
function ResetSessionlogout() {
    //Redirect to refresh Session.
    debugger;
    $.ajax({
        url: "/Login/Logout/",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
           
            window.location = "../Login/LoginIndex";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function GetSessionID() {
    //Redirect to refresh Session.
    debugger;
    $.ajax({
        url: "/Login/GetSessionId/",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (json) {
            debugger;

            //window.location = "../Login/LoginIndex";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}