var username = 0;
var checkuser = 0;
var pass = 0;
var UName = 0;
$(document).ready(function () {
    debugger;
    UName = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    checkuser = queryvalue[0];

    if (checkuser == "UserName") {
        username = queryvalue[1];
    } else {
        username = UName;
    }
    Menulist();
    //var txt = "";
    //texttospeak(txt);

});

 
 
 
function Menulist() {
    $.ajax({
        url: "/login/GetMenuListDetails",
        //data: JSON.stringify({ Menuname: MnuName }),
        //type: "POST",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           // alert(MnuName);
            var obj = result.RoleDetList;
            debugger;
            // alert(MenuName[j]);
            var i = 0;
            var ADD = null;
            var EDIT = null;
            var DELETE = null;
            var PRINT = null;
            var ALL = null;
            var MENU = null
            //            Loginctlleb.in
            // var UserN = $('#hdnusername').val();

            if (username == undefined) {
                var UserN = UName;
            } else {
                var UserN = username;//sessionStorage.getItem("UserName");//$("#hdnusername").data('value');
            }
            $("#DefaultPage").hide();
            document.getElementById("Loginctlleb").innerHTML = UserN.toUpperCase();
            
            if (UserN.toUpperCase() != "SUPERUSER") {
                for (i = 0; i < obj.length; i++) {

                    if (obj[i].AllFlg != 0) {
                        ALL = "Y";
                    } else {
                        ALL = "N";
                    }
                    if (obj[i].AddFlg != 0) {
                        ADD = "Y";
                    } else {
                        ADD = "N";
                    }
                    if (obj[i].DelFlg != 0) {
                        DELETE = "Y";
                    } else {
                        DELETE = "N";
                    }
                    if (obj[i].EditFlg != 0) {
                        EDIT = "Y";
                    } else {
                        EDIT = "N";
                    }
                    if (obj[i].PrintFlg != 0) {
                        PRINT = "Y";
                    } else {
                        PRINT = "N";
                    }

                    MENU = obj[i].MenuName;

                    if (ALL == "Y" || ADD == "Y" || EDIT == "Y" || DELETE == "Y" || PRINT == "Y") {
                        $("#" + MENU).show();
                    }
                    else {
                        $("#" + MENU).hide();
                    }

                    ADD = "N";
                    EDIT = "N";
                    DELETE = "N";
                    PRINT = "N";
                    ALL = "N";
                }
            }
            /*if (result == "A") {
                $("#" + MnuName).show();
            }*/
        }


    });
}

function httpGet(url, onSuccess, onFailure) {
    if ($.trim(onFailure).length == 0) {
        onFailure = onFailure;
    }
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=utf- 8",
        dataType: "json",
        async: false,
        success: onSuccess,
        error: onFailure
    });
}

function httpPost(url, data, onSuccess, onFailure) {
    if ($.trim(onFailure).length == 0) {
        onFailure = onFailure;
    }
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf- 8",
        success: onSuccess,
        error: onFailure
    });
}



var onFailure = function (e) {
    alert(e);
}
