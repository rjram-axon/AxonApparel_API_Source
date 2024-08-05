/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {

    $.ajax({
        type: "GET",
        url: '/Color/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
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
                select: {
                    style: 'single'
                },
                "bSort": false,
                columns: [
                         { title: "ColorId", "visible": false },
                         { title: "Color Name" },
                         { title: "Status" },
                         { title: "Action" },
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#ColorID').val("");
    $('#ddlcolorgroup').empty("");
    $('#colorcode').val("");
    $('#colorname').val("");
    $('#pantone').val("");
    $('#Colorno').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ColorID').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    LoadColorGroupDDL("#ddlcolorgroup");

}

//Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#colorname').val().trim() == "") {
        $('#colorname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#colorname').css('border-color', 'lightgrey');
    }
    
    return isValid;
}

//Function for getting the Data Based upon Color ID
function getbyID(ColorID) {
    $('#ddlcolorgroup').empty();
    LoadColorGroupDDL("#ddlcolorgroup");

    $('#ColorID').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Color/getbyID/" + ColorID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorID').val(obj.ColorId);
            $('#colorcode').val(obj.ColorCode);
            $('#colorname').val(obj.ColorName);
            $('#pantone').val(obj.PantOne);
            $('#ddlcolorgroup').val(obj.ColorGroupId);
            $('#Colorno').val(obj.ColorNo);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(ColorID) {
    $('#ddlcolorgroup').empty();
    LoadColorGroupDDL("#ddlcolorgroup");

    $('#ColorID').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Color/getbyID/" + ColorID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorID').val(obj.ColorId);
            $('#colorcode').val(obj.ColorCode);
            $('#colorname').val(obj.ColorName);
            $('#pantone').val(obj.PantOne);
            $('#ddlcolorgroup').val(obj.ColorGroupId);
            $('#Colorno').val(obj.ColorNo);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for deleting Color record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Color/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
                
    //            if (result.Value == 1) {
    //                $('#tbody').DataTable().destroy();
    //                loadData();
    //            }
    //            else {
    //                window.location.href = "/Error/Index";
    //            }
    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }
    //    });
    //}
    CheckColorAlloted(ID)
}
function CheckColorAlloted(ID) {
    debugger;
    $.ajax({
        url: "/Color/GetColorRefDetails",
        data: JSON.stringify({ ColorId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountColorId;

                    if (c > 0) {
                        alert("Color Is Alloted For Some Other Entry,Please Check it....");
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Color/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        loadData();
                                    }
                                    else {
                                        window.location.href = "/Error/Index";
                                    }
                                },
                                error: function (errormessage) {
                                    alert(errormessage.responseText);
                                }
                            });
                        }
                    }
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        PantOne: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        IsActive: ischecked,

    };
    LoadingSymb();
    $.ajax({
        type: "POST",
        url: "/Color/Add",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ColorObj),
        dataType: "json",
        success: function (result) {
           

            if (result.Value == 1) {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ColorID').val("");
                $('#ddlcolorgroup').val("");
                $('#colorcode').val("");
                $('#colorname').val("");
                $('#pantone').val("");
                $('#Colorno').val("");
                $('#Status').val("");
            }
            else {
                window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
     
    });

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        PantOne: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Color/Update",
        data: JSON.stringify(ColorObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           

            if (result.Value == 1) {
                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();

                loadData();
                $('#ColorID').val("");
                $('#ddlcolorgroup').val("");
                $('#colorcode').val("");
                $('#colorname').val("");
                $('#pantone').val("");
                $('#Colorno').val("");
                $('#Status').prop("checked", false);
            }
            else {
                window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

