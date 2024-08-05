var SetupList = [];

$(document).ready(function () {
   
    LoadMaingrid();
    LoadAlertDll();
    $("#txtAlert").prop("disabled", true);

    $(document).on('click', '.groupMail', function () {
        debugger;

        var table = $('#tblSetdetails').DataTable();
        var AlertID = table.row($(this).parents('tr')).data()["AlertID"];
        var EmployeeID = table.row($(this).parents('tr')).data()["EmployeeID"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].Mail = true;

                }
            }
        }
        else {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].Mail = false;

                }
            }
        }

    });
    $(document).on('click', '.groupPopup', function () {
        debugger;

        var table = $('#tblSetdetails').DataTable();
        var AlertID = table.row($(this).parents('tr')).data()["AlertID"];
        var EmployeeID = table.row($(this).parents('tr')).data()["EmployeeID"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].Popup = true;

                }
            }
        }
        else {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].Popup = false;

                }
            }
        }

    });
    $(document).on('click', '.groupSMS', function () {
        debugger;

        var table = $('#tblSetdetails').DataTable();
        var AlertID = table.row($(this).parents('tr')).data()["AlertID"];
        var EmployeeID = table.row($(this).parents('tr')).data()["EmployeeID"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].SMS = true;

                }
            }
        }
        else {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].AlertID == AlertID && SetupList[f].EmployeeID == EmployeeID) {
                    SetupList[f].SMS = false;

                }
            }
        }

    });

});

function clearTextBox() {
    $('#btnDelete').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();

    $("#txtAlert").prop("disabled", true);
    $('#txtAlert').val('');
   
    SetupList = [];
    loadSetupTable();
}

function getbyID(id) {

    $('#btnDelete').hide();
    $('#btnAdd').hide();
    $('#btnUpdate').show();
    $('#myModal').modal('show');
    $("#btnUpdate").attr("disabled", false);
    SetupList = [];
    loadSetupTable();
    LoadEdit(id);
}

function getViewbyID(id) {

    $('#btnDelete').hide();
    $('#btnAdd').hide();
    $('#btnUpdate').hide();
    $('#myModal').modal('show');
    LoadEdit(id);
}

function LoadEdit(id) {
    $.ajax({
        url: "/AlertSetup/GetAlertEditbyid/",
        data: JSON.stringify({ Alertid: id }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            SetupList = (result.Value);

            if (SetupList.length > 0) {
                $('#txtAlert').val(SetupList[0].AlertName);
               
            }
            loadSetupTable();
        },

        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function ChangeDoc() {
    $('#ddlMAlert').val(0);
    LoadMaingrid();
    LoadAlertDll();
}



function LoadAlertDll() {

    var Altype = $('input[name="Altype"]:checked').attr('value');
    $.ajax({
        url: "/AlertSetup/GetAlertDDL/",
        type: "POST",
        data: JSON.stringify({ Type: Altype }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
           


            var revdet = {};
            var rev = [];

            $.each(obj, function (i, el) {

                if (!revdet[el.AlertID]) {
                    revdet[el.AlertID] = true;
                    rev.push(el);
                }
            });

            $('#ddlMAlert').empty();
            $('#ddlMAlert').append($('<option/>').val('0').text('--Select Alert--'));
            $.each(rev, function () {
                $('#ddlMAlert').append($('<option></option>').val(this.AlertID).text(this.AlertName));
            });


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });



}

function LoadMaingrid() {
    debugger;

    var Altype = $('input[name="Altype"]:checked').attr('value');
    var alertid=$('#ddlMAlert option:selected').val();

    if(alertid==undefined){
        alertid=0;
    }



    $.ajax({
        url: "/AlertSetup/List",
        data: JSON.stringify({ Alerttype: Altype, Alertid: alertid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tbody').DataTable();
                var rows = table.clear().draw();
                $('#tbody').DataTable().rows.add(dataSet);
                $('#tbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    columns: [
                             { title: "AlertId", "visible": false },
                             { title: "Alert" },
                             { title: "Category", "visible": false },
                             { title: "Action" },
                    ]

                });
            }

            var table = $('#tbody').DataTable();
            $("#tbody tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tbody tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
          
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadSetupTable() {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblSetdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblSetdetails').DataTable().destroy();
    }

    $('#tblSetdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: SetupList,
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
              { title: "AlertID", data: "AlertID", "visible": false },
            { title: "EmployeeID", data: "EmployeeID", "visible": false },
            { title: "Employee", data: "Employee"},
           {
               title: "Mail", data: "Mail",
               render: function (data, type, row) {

                   return '<input type="checkbox" id="groupMail" class="groupMail editor-active" unchecked  value=' + data + ' >';


               }
           },
            {
                title: "Popup", data: "Popup",
                render: function (data, type, row) {

                    return '<input type="checkbox" id="groupPopup" class="groupPopup editor-active" unchecked  value=' + data + ' >';


                }
            },
              {
                  title: "SMS", data: "SMS",
                  render: function (data, type, row) {

                      return '<input type="checkbox" id="groupSMS" class="groupSMS editor-active" unchecked  value=' + data + ' >';


                  }
              },



        ]
    });


    $("#tblSetdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblSetdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });


    $('input[id=groupMail]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "true") {
            row.find('#groupMail').prop('checked', true);
        }
    });

    $('input[id=groupPopup]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "true") {
            row.find('#groupPopup').prop('checked', true);
        }
    });
    $('input[id=groupSMS]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "true") {
            row.find('#groupSMS').prop('checked', true);
        }
    });


}

function Update() {
    debugger;
    var isAllValid = true;

    var cnt = 0;
    $.each(SetupList, function (index, value) {
        if (this.Mail == true) {
            cnt++;
        }
        if (this.Popup == true) {
            cnt++;
        }
        if (this.SMS == true) {
            cnt++;
        }
    })
    //if (cnt == 0) {
    //    //alert('Please select anyone StoreUnit..');
    //    var msg = 'Please select anyone StoreUnit...';
    //    var flg = 4;
    //    var mode = 1;
    //    AlartMessage(msg, flg, mode);
    //    isAllValid = false;
    //}


    if (isAllValid) {
        var Spm = SetupList;
        
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/AlertSetup/Update",
            data: JSON.stringify(Spm),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("StoreSetup Updated Sucessfully");
                    var Name = $('#txtAlert').val();
                    AddUserEntryLog('Master', 'Alert Setup', 'UPDATE', Name);
                    var msg = 'Alert Setup Updated Sucessfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    //window.location.href = "/StoreSetup/StoreSetupIndex";
                    $("#btnUpdate").attr("disabled", false);
                } else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}