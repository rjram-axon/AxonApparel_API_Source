
var machinename = '';
var machineip = '';
var entrydate = '';
var listflg = false;
var Gloguserid = 0;
$(document).ready(function () {

    Gloguserid = $("#hdnLoginUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    machinename = $("#hdnmachinename").data('value');
    machineip = $("#hdnipaddress").data('value');
    gettodayDate();
   // GetComputerName();
    //getIP();
    //LoadAllddl();
    //List();
    
})

function gettodayDate() {
   
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    entrydate = Fdatestring;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

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
                
                machinename = result;
            },
            error: function (errormessage) {
               
                alert(errormessage.responseText);
            }
        });

    }
    catch (e) { }
}
function AddPopupAlert(Message) {
   
    //gettodayDate();
    
    Gloguserid = $("#hdnLoginUserid").data('value');
    
    var Popupdet = {
        UserId: Gloguserid,
        Message: Message,
    }
   
    
    $.ajax({
        url: "/UserEntryLog/AddPopupAlert",
        data: JSON.stringify(Popupdet),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function AddUserEntryLog(Modulename, Entryname, Entrymode, Entryno) {
   
    //gettodayDate();
    gettodayDate();
    Gloguserid = $("#hdnLoginUserid").data('value');
    
    var entrylogdet = {
        UserId: Gloguserid,
        ModuleName: Modulename,
        EntryName: Entryname,
        MachineName: machinename,
        MachineIP: machineip,
        EntryMode: Entrymode,
        EntryDate: entrydate,
        EntryNo: Entryno
    }
   
    
    $.ajax({
        url: "/UserEntryLog/Add",
        data: JSON.stringify(entrylogdet),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function List() {
   
    if (listflg) {
        $('#tPMbody').DataTable().destroy();
    }
    LoadMainList();
    LoadUserNameddl();

}
function LoadMainList() {
    //$('#tPMbody').DataTable().destroy();
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var userid = $('#ddlUsername').val();
    if (userid == null || userid == 0) {
        userid = 0;
    }
    var modulename = $('#ddlModule').val();
    if (modulename == null || modulename == 0) {
        modulename = '';
    }
    var entryname = $('#ddlEntryName').val();
    if (entryname == null || entryname == 0) {
        entryname = '';
    }
    var machinename = $('#ddlMachine').val();
    if (machinename == null || machinename == 0) {
        machinename = '';
    }
    var entrymode = $('#ddlEntrymode').val();
    if (entrymode == null || entrymode == 0) {
        entrymode = '';
    }
    var entryno = $('#ddlEntryNo').val();
    if (entryno == null || entryno == 0) {
        entryno = '';
    }


    $.ajax({
        url: "/UserEntryLog/ListUserEntryLog",
        data: JSON.stringify({
            userid: userid, modulename: modulename, entryname: entryname, machinename: machinename, machineip: '', entrymode: entrymode,
            FromEntryDate: FDate, ToEntryDate: TDate, entryno: entryno
        }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            //var tableload = json.data
            //var dataSet = eval("[" + tableload + "]");

            $.each(obj, function () {
                obj.EntryDate = (moment(obj.EntryDate).format('DD/MM/YYYY hh:mm:ss'));

            });

            var inputcount = 0;
            $('#tPMbody tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                $('#tPMbody').DataTable().destroy();
            }
          

            $('#tPMbody').DataTable({
                data: obj,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                "bSort": false,
                
                columns: [
                         { title: "EntryLogid", data: "EntryLogid", "visible": false },
                         { title: "UserId", data: "UserID", "visible": false },
                         { title: "EntryNo", data: "EntryNo" },
                         //{ title: "Entry Date", data: "EntryDate" },

                             {
                                 title: "Entry Date", data: "EntryDate", render: function (data) {
                                     return (moment(data).format("DD/MM/YYYY hh:mm:ss "));
          }
      },

                         { title: "Entry Mode", data: "EntryMode" },
                         { title: "UserName", data: "UserName" },
                         { title: "Module Name", data: "ModuleName" },
                         { title: "Entry Name", data: "EntryName" },
                         { title: "Machine Name", data: "MachineName" },
                         { title: "Machine IP", data: "MachineIP" },
                ]

            });
            //$(document).ready(function () {
            //    var table = $('#tPMbody').DataTable();

            //    $('#tPMbody tbody').on('click', 'tr', function () {
            //        if ($(this).hasClass('selected')) {
            //            $(this).removeClass('selected');
            //        }
            //        else {
            //            table.$('tr.selected').removeClass('selected');
            //            $(this).addClass('selected');
            //        }
            //    });


            //});
          
            //var entrynoobj = [];
            //$.each(dataSet, function (i) {
            //    var obj = {
            //        EntryNo: dataSet[i][2]
            //    }
            //    entrynoobj.push(obj);
            //});


            //var entrynameobj = [];
            //$.each(dataSet, function (i) {
            //    var obj = {
            //        EntryName: dataSet[i][7]
            //    }
            //    entrynameobj.push(obj);
            //});

            //var Mnameobj = [];
            //$.each(dataSet, function (i) {
            //    var obj = {
            //        ModuleName: dataSet[i][6]
            //    }
            //    Mnameobj.push(obj);
            //});

            //var Machnameobj = [];
            //$.each(dataSet, function (i) {
            //    var obj = {
            //        MachineName: dataSet[i][8]
            //    }
            //    Machnameobj.push(obj);
            //});


            var entryno = {};
            var entrynoary = [];

            $.each(obj, function (i, el) {

                if (!entryno[el.EntryNo]) {
                    entryno[el.EntryNo] = true;
                    entrynoary.push(el);
                }
            });

            $('#ddlEntryNo').empty();
            $('#ddlEntryNo').append($('<option/>').val('0').text('--Select Entry No--'));
            $.each(entrynoary, function () {
                $('#ddlEntryNo').append($('<option></option>').val(this.EntryNo).text(this.EntryNo));
            });

            var entryname = {};
            var entrynameary = [];

            $.each(obj, function (i, el) {

                if (!entryname[el.EntryName]) {
                    entryname[el.EntryName] = true;
                    entrynameary.push(el);
                }
            });

            $('#ddlEntryName').empty();
            $('#ddlEntryName').append($('<option/>').val('0').text('--Select EntryName --'));
            $.each(entrynameary, function () {
                $('#ddlEntryName').append($('<option></option>').val(this.EntryName).text(this.EntryName));
            });

            var modulename = {};
            var modulenameary = [];

            $.each(obj, function (i, el) {

                if (!modulename[el.ModuleName]) {
                    modulename[el.ModuleName] = true;
                    modulenameary.push(el);
                }
            });

            $('#ddlModule').empty();
            $('#ddlModule').append($('<option/>').val('0').text('--Select Module--'));
            $.each(modulenameary, function () {
                $('#ddlModule').append($('<option></option>').val(this.ModuleName).text(this.ModuleName));
            });

            var machinename = {};
            var machinenameary = [];

            $.each(obj, function (i, el) {

                if (!machinename[el.MachineName]) {
                    machinename[el.MachineName] = true;
                    machinenameary.push(el);
                }
            });

            $('#ddlMachine').empty();
            $('#ddlMachine').append($('<option/>').val('0').text('--Select Machine--'));
            $.each(machinenameary, function () {
                $('#ddlMachine').append($('<option></option>').val(this.MachineName).text(this.MachineName));
            });




            listflg = true;
        },

        failure: function (errMsg) {
           // alert(errMsg);
        }
    });

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

function LoadAllddl() {
   
 
    $.ajax({
        url: "/UserEntryLog/GetDDLdet/",
        data: JSON.stringify({ }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",

        success: function (result) {
           
            var obj = result.Value;
           
            var entryno = {};
            var entrynoary = [];

            $.each(obj, function (i, el) {

                if (!entryno[el.EntryNo]) {
                    entryno[el.EntryNo] = true;
                    entrynoary.push(el);
                }
            });

            $('#ddlEntryNo').empty();
            $('#ddlEntryNo').append($('<option/>').val('0').text('--Select Entry No--'));
            $.each(entrynoary, function () {
                $('#ddlEntryNo').append($('<option></option>').val(this.EntryNo).text(this.EntryNo));
            });

            var entryname = {};
            var entrynameary = [];

            $.each(obj, function (i, el) {

                if (!entryname[el.EntryName]) {
                    entryname[el.EntryName] = true;
                    entrynameary.push(el);
                }
            });

            $('#ddlEntryName').empty();
            $('#ddlEntryName').append($('<option/>').val('0').text('--Select EntryName --'));
            $.each(entrynameary, function () {
                $('#ddlEntryName').append($('<option></option>').val(this.EntryName).text(this.EntryName));
            });

            var modulename = {};
            var modulenameary = [];

            $.each(obj, function (i, el) {

                if (!modulename[el.ModuleName]) {
                    modulename[el.ModuleName] = true;
                    modulenameary.push(el);
                }
            });

            $('#ddlModule').empty();
            $('#ddlModule').append($('<option/>').val('0').text('--Select Module--'));
            $.each(modulenameary, function () {
                $('#ddlModule').append($('<option></option>').val(this.ModuleName).text(this.ModuleName));
            });

            var machinename = {};
            var machinenameary = [];

            $.each(obj, function (i, el) {

                if (!machinename[el.MachineName]) {
                    machinename[el.MachineName] = true;
                    machinenameary.push(el);
                }
            });

            $('#ddlMachine').empty();
            $('#ddlMachine').append($('<option/>').val('0').text('--Select Machine--'));
            $.each(machinenameary, function () {
                $('#ddlMachine').append($('<option></option>').val(this.MachineName).text(this.MachineName));
            });

        },
        error: function (errormessage) {
           
            //alert(errormessage.responseText);
        }
    });


}
function LoadUserNameddl() {
   
    $.ajax({
        url: "/UserEntryLog/GetUsername/",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=UTF-8",

        success: function (result) {
            
            var obj = result.Value;
           
            var username = {};
            var usernameary = [];

            $.each(obj, function (i, el) {

                if (!username[el.UserID]) {
                    username[el.UserID] = true;
                    usernameary.push(el);
                }
            });

            $('#ddlUsername').empty();
            $('#ddlUsername').append($('<option/>').val('0').text('--Select User--'));
            $.each(usernameary, function () {
                $('#ddlUsername').append($('<option></option>').val(this.UserID).text(this.UserName));
            });

           

        },
        error: function (errormessage) {
            
            alert(errormessage.responseText);
        }
    });


}
function Report() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var userid = $('#ddlUsername').val();
    if (userid == null || userid == 0) {
        userid = 0;
    }
    var modulename = $('#ddlModule').val();
    if (modulename == null || modulename == 0) {
        modulename = '';
    }
    var entryname = $('#ddlEntryName').val();
    if (entryname == null || entryname == 0) {
        entryname = '';
    }
    var machinename = $('#ddlMachine').val();
    if (machinename == null || machinename == 0) {
        machinename = '';
    }
    var entrymode = $('#ddlEntrymode').val();
    if (entrymode == null || entrymode == 0) {
        entrymode = '';
    }
    var entryno = $('#ddlEntryNo').val();
    if (entryno == null || entryno == 0) {
        entryno = '';
    }
    machineip = '';
    window.open("../Reports/UserEntryLog/UserEntryLogReport.aspx?userid=" + userid + "&modulename=" + modulename + "&entryname=" + entryname + "&machinename=" + machinename + "&machineip=" + machineip + "&entrymode=" + entrymode + "&FromEntryDate=" + FDate + "&ToEntryDate=" + TDate + "&entryno=" + entryno);
}