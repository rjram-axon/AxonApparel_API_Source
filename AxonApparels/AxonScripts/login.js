/* LOGIN - MAIN.JS - dp 2017 */

// LOGIN TABS
var PCname = '';
var machineip = '';
var dunit = 0;
var chkunit = 0;
$(document).ready(function () {
    var tab = $('.tabs h3 a');
    tab.on('click', function (event) {
        event.preventDefault();
        tab.removeClass('active');
        $(this).addClass('active');
        tab_content = $(this).attr('href');
        $('div[id$="tab-content"]').removeClass('active');
        $(tab_content).addClass('active');
    });
    getIP();
    GetComputerName();
    //LoadStorefromcompany();
    //LoadCompanyUnitDDL('#unit_select');
    GetDefault();
});

function LoadStorefromcompany() {

    $.ajax({
        url: "/CompanyUnit/GetCompanyUnits",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            if (data.length > 0) {

                chkunit = 1;
            }
            $('#unit_select').empty();
            $('#unit_select').append($('<option/>').val('0').text('--Select unit--'));
            $.each(data, function () {
                $('#unit_select').append($('<option></option>').val(this.Id).text(this.CompanyUnitName));
            });
            $('#unit_select').trigger("select:updated");
            $('#unit_select').val(dunit).trigger('change');

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

   

}
function GetDefault() {

    var MisSetId = 0;
    debugger;

    $.ajax({
        url: "/MISSetting/GetDefaultDetails",
        data: JSON.stringify({ MisId: MisSetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (obj != undefined) {

                var DCompId = obj.dCompanyId;
                var DCompUnitId = obj.dCompanyUnitId;
                dunit = DCompUnitId;
                LoadStorefromcompany();
                //$('#txtMainFDays').val(obj[0]["FromDays"]);
                //window.location.href = "/BulkOrder/BulkOrderIndex?UserId=" + UserId + "=&UserName=" + UserName;
                //window.location.href = "/BulkOrder/BulkOrderIndex";

            }
            else {

            }
        }
    });
}
function GetComputerName() {
    try {
        $.ajax({
            url: "/UserEntryLog/GetComputerName",
            data: JSON.stringify(),
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                PCname = result;
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    } 
    catch (e) { }
}
function getIP() {
    $.ajax({
        url: "/UserEntryLog/GetIPaddress",
        data: JSON.stringify(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            machineip = result;
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// SLIDESHOW
$(document).ready(function () {
    $('#slideshow > div:gt(0)').hide();
    setInterval(function () {
        $('#slideshow > div:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow');
    }, 3850);
});

// CUSTOM JQUERY FUNCTION FOR SWAPPING CLASSES
(function ($) {
    'use strict';
    $.fn.swapClass = function (remove, add) {
        this.removeClass(remove).addClass(add);
        return this;
    };
}(jQuery));

// SHOW/HIDE PANEL ROUTINE (needs better methods)
// I'll optimize when time permits.
$(function () {
    $('.agree,.forgot, #toggle-terms, .log-in, .sign-up').on('click', function (event) {
        event.preventDefault();
        var terms = $('.terms'),
        recovery = $('.recovery'),
        close = $('#toggle-terms'),
        arrow = $('.tabs-content .fa');
        if ($(this).hasClass('agree') || $(this).hasClass('log-in') || ($(this).is('#toggle-terms')) && terms.hasClass('open')) {
            if (terms.hasClass('open')) {
                terms.swapClass('open', 'closed');
                close.swapClass('open', 'closed');
                arrow.swapClass('active', 'inactive');
            } else {
                if ($(this).hasClass('log-in')) {
                    return;
                }
                terms.swapClass('closed', 'open').scrollTop(0);
                close.swapClass('closed', 'open');
                arrow.swapClass('inactive', 'active');
            }
        }
        else if ($(this).hasClass('forgot') || $(this).hasClass('sign-up') || $(this).is('#toggle-terms')) {
            if (recovery.hasClass('open')) {
                recovery.swapClass('open', 'closed');
                close.swapClass('open', 'closed');
                arrow.swapClass('active', 'inactive');
            } else {
                if ($(this).hasClass('sign-up')) {
                    return;
                }
                recovery.swapClass('closed', 'open');
                close.swapClass('closed', 'open');
                arrow.swapClass('inactive', 'active');
            }
        }
    });
});

// DISPLAY MSSG
$(function () {
    $('.recovery .button').on('click', function (event) {
        event.preventDefault();
        $('.recovery .mssg').addClass('animate');
        setTimeout(function () {
            $('.recovery').swapClass('open', 'closed');
            $('#toggle-terms').swapClass('open', 'closed');
            $('.tabs-content .fa').swapClass('active', 'inactive');
            $('.recovery .mssg').removeClass('animate');
        }, 2500);
    });
});

// DISABLE SUBMIT FOR DEMO
$(function () {
    $('.button').on('click', function (event) {
        $(this).stop();
        event.preventDefault();
        return false;
    });
});


function Login() {
    $('#Logloading').show();
    var UserN = $('#user_login').val();
    sessionStorage.setItem("UserName", UserN);
    var PassW = $('#user_pass').val();
    //GetDefaultMis();

    if (chkunit == 1) {
        var unit = $('#unit_select').val();
        if (unit == 0) {
            $('#Logloading').hide();
            alert('Select Unit...');
            return true;
        }
    }

    $.ajax({
        url: "/Login/ValidateUser",
        data: JSON.stringify({ Username: UserN, Password: PassW, Remember:1 }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {      
            obj = json;
            if (obj == true) {
                GetDefaultMis();
                //$.ajax({
                //    url: "/Login/CheckLicenceUser",
                //    data: JSON.stringify({ }),
                //    type: "POST",
                //    contentType: "application/json;charset=utf-8",
                //    dataType: "json",
                //    success: function (result) {
                       // if (result.Value) {
                        $.ajax({
                            url: "/Login/GetUserId",
                            data: JSON.stringify({ Username: UserN, Password: PassW }),
                            type: "POST",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                var obj = result.Value;                             
                                if (obj != undefined) {
                                    if (obj.LoginStatus != 'Y') {
                                        if (obj.Multiple == 1 || (UserN.toUpperCase()) == 'SUPERUSER') {
                                            $.ajax({
                                                url: "/Login/CheckLicenceUser",
                                                data: JSON.stringify({}),
                                                type: "POST",
                                                contentType: "application/json;charset=utf-8",
                                                dataType: "json",
                                                success: function (result) {
                                                    if (result.Value) {
                                                        loginunitUpdate(UserN, PassW, unit);
                                                        CheckAMC();
                                                        DbBakup();

                                                        $.ajax({
                                                            url: "/Login/UpdateLoginStatus",
                                                            data: JSON.stringify({ Username: UserN, Password: PassW, Loginstatus: 'Y', MachineName: PCname }),
                                                            type: "POST",
                                                            contentType: "application/json;charset=utf-8",
                                                            dataType: "json",
                                                            success: function (result) {
                                                                if (result.Value) {
                                                                   
                                                                }
                                                            }
                                                        });
                                                        window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserN;
                                                    }
                                                    else {

                                                        $('#Logloading').hide();
                                                        alert("Number of LicenceUser already login ");
                                                    }
                                                }
                                            });
                                        } else {
                                            if (unit == obj.UnitId) {

                                                $.ajax({
                                                    url: "/Login/CheckLicenceUser",
                                                    data: JSON.stringify({}),
                                                    type: "POST",
                                                    contentType: "application/json;charset=utf-8",
                                                    dataType: "json",
                                                    success: function (result) {
                                                        if (result.Value) {
                                                            loginunitUpdate(UserN, PassW, unit);
                                                            CheckAMC();
                                                            DbBakup();

                                                            $.ajax({
                                                                url: "/Login/UpdateLoginStatus",
                                                                data: JSON.stringify({ Username: UserN, Password: PassW, Loginstatus: 'Y', MachineName: PCname }),
                                                                type: "POST",
                                                                contentType: "application/json;charset=utf-8",
                                                                dataType: "json",
                                                                success: function (result) {
                                                                    if (result.Value) {
                                                                        
                                                                    }
                                                                }
                                                            });

                                                            window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserN;
                                                        }
                                                        else {

                                                            $('#Logloading').hide();
                                                            alert("Number of LicenceUser already login ");
                                                        }
                                                    }
                                                });
                                            } else {
                                                $('#Logloading').hide();
                                                alert('Select Similor Unit..')
                                                return true
                                            }
                                        }
                                    }
                                    else {

                                        if ((obj.LoginPC).toUpperCase() == PCname.toUpperCase()) {
                                            if (obj.Multiple == 1 || (UserN.toUpperCase()) == 'SUPERUSER') {
                                                loginunitUpdate(UserN, PassW, unit);
                                                window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserN;
                                                CheckAMC();
                                                DbBakup();
                                                $.ajax({
                                                    url: "/Login/UpdateLoginStatus",
                                                    data: JSON.stringify({ Username: UserN, Password: PassW, Loginstatus: 'Y', MachineName: PCname }),
                                                    type: "POST",
                                                    contentType: "application/json;charset=utf-8",
                                                    dataType: "json",
                                                    success: function (result) {
                                                    }
                                                });
                                            } else {
                                                if (unit == obj.UnitId) {
                                                    loginunitUpdate(UserN, PassW, unit);
                                                    window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserN;
                                                    CheckAMC();
                                                    DbBakup();
                                                    $.ajax({
                                                        url: "/Login/UpdateLoginStatus",
                                                        data: JSON.stringify({ Username: UserN, Password: PassW, Loginstatus: 'Y', MachineName: PCname }),
                                                        type: "POST",
                                                        contentType: "application/json;charset=utf-8",
                                                        dataType: "json",
                                                        success: function (result) {
                                                        }
                                                    });
                                                } else {
                                                    $('#Logloading').hide();
                                                    alert('Select Similor Unit..')
                                                    return true
                                                }
                                            }
                                        } else {

                                            $('#Logloading').hide();
                                            alert("User Already LogIn" + "-" + obj.LoginPC);
                                        }
                                    }             
                                }                             
                            }
                        });
                //    }
                //        else {
                //            alert("Number of LicenceUser already login ");
                //        }
                //    }
                //});


                //window.location.href = "/BulkOrder/BulkOrderIndex";
                //window.location.href = "/DefaultPage/DefaultPage";
                //window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserN;
            }
            else {
                alert("Invalid UserName/Password");
                window.location.href = "/Login/LoginIndex";
            }
        }
    });
}
function loginunitUpdate(UserN, PassW, unitid) {
    debugger;
    var unit = $('select#unit_select option:selected').text();
    $.ajax({
        url: "/Login/UpdateLoginunit",
        data: JSON.stringify({ Username: UserN, Password: PassW, Unitid: unitid, unit: unit }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

        }
    });
}

function GetDefaultMis() {
    var MisSetId = 0;
    $.ajax({
        url: "/MISSetting/GetDefaultDetails",
        data: JSON.stringify({ MisId: MisSetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.value;
            if (obj != undefined) {

                var DCompId = obj[0]["dCompanyId"];
                var DCompUnitId = obj[0]["dCompanyUnitId"];
                MisSetId = obj[0]["MisId"];
                GetDefMisPath(MisSetId);
            }
            else {

            }
        }
    });
}

function GetDefMisPath(MisSetId) {
    $.ajax({
        url: "/MISSetting/GetDefaultDetails",
        data: JSON.stringify({ MisId: MisSetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.value;
            if (obj != undefined) {
                var DCompId = obj[0]["dCompanyId"];
                var DCompUnitId = obj[0]["dCompanyUnitId"];
                $('#txtMainFDays').val(obj[0]["FromDays"]);
            }
            else {

            }
        }
    });
}

function GetUser() {
    var UserN = $('#user_login').val();
    var PassW = $('#user_pass').val();

    $.ajax({
        url: "/Login/GetUserId",
        data: JSON.stringify({ Username: UserN, Password: PassW }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.value;
            if (obj != undefined) {
                   
                var UserId = obj[0]["UserId"];
                var UserName = obj[0]["Username"];
                GetDefaultMis();
                //window.location.href = "/BulkOrder/BulkOrderIndex?UserId=" + UserId + "=&UserName=" + UserName;
                //window.location.href = "/BulkOrder/BulkOrderIndex";
                window.location.href = "/DefaultPage/DefaultPage";
            }
            else {

            }
        }
    });
}

function DbBakup() {
    $.ajax({
        url: "/DBbackup/UpdateBackUpLogin",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "DB already Bakup") {
               // alert("Database Backup Sucessfully");
            } else {
                alert(result);
            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });

}

function CheckAMC() {
    $.ajax({
        url: "/AMC/CheckAMC",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.length > 0) {
                if (obj[0].ChkLicenceexpiry > 0) {
                    alert('AMC Expired !!!');
                }
            } else {
                alert('AMC Expired !!!');
            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });

}