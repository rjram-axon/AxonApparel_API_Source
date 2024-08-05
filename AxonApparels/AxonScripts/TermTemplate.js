var supList = [];
var Itemrowindex = -1;
var Sno = 0;
var GTempMasId = 0;
$(document).ready(function () {

    loadData();

    $('#btncoloradd').click(function () {
        debugger;


        var leng = 0;
        var isAllValid = true;

        debugger;
        if ($('#ddlTerms').val() == "0") {
            isAllValid = false;
            $('#ddlTerms').css('border-color', 'Red');
        }
        else {
            $('#ddlTerms').css('border-color', 'lightgrey');
        }

        var desc = $('#txtDesc').val();
        var termname = $('#txttemplate').val();

        if (supList.length == 0) {
            leng = 1;
        }
        else {
            leng = supList.length + 1;
        }


        if (isAllValid) {


            debugger;
            var supListObj = {
                Terms: $("#ddlTerms option:selected").text(),
                TermsId: $('#ddlTerms').val(),
                TemplateName: $('#txttemplate').val(),
                TermDesc: desc,
                TermDetId: 0,
                Sno: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            supList.push(supListObj);

            loadTermTable(supList);


            fnClearSupControls();


            $('#btncoloradd').show();
            $('#btncolorupdate').hide();
        }
    });

    $(document).on('click', '.btnColoredit', function () {

        var table = $('#tblItemdetails').DataTable();

        Sno = table.row($(this).parents('tr')).data()["Sno"];
        TermsId = table.row($(this).parents('tr')).data()["TermsId"];
        TermDesc = table.row($(this).parents('tr')).data()["TermDesc"];

        $('#ddlTerms').val(TermsId).trigger('change');
        $('#txtDesc').val(TermDesc);

        $('#btncoloradd').hide();
        $('#btncolorupdate').show();
    });



    $('#btncolorupdate').click(function () {
        debugger;

        for (var r = 0; r < supList.length; r++) {

            if (supList[r].Sno == Sno) {

                supList[r].TermsId = $('#ddlTerms').val();
                supList[r].Terms = $("#ddlTerms option:selected").text();
                supList[r].TermDesc = $("#txtDesc").val();
            }
        }
        loadTermTable(supList);

        fnClearSupControls();
        $('#btncoloradd').show();
        $('#btncolorupdate').hide();
    });

    $(document).on('click', '.btnremove', function () {
        rowindex = $(this).closest('tr').index();
        supList.splice(rowindex, 1);
        document.getElementById("tblItemdetails").deleteRow(rowindex + 1);
    });


    $('#tblItemdetails').on('keyup', 'tr', function () {

        var tr = $(this).closest("tr");
        var rowindexof = tr.index();
        Itemrowindex = rowindexof;

    });

});

function fnClearSupControls() {
    debugger;

    $('#ddlTerms').val('0').trigger('change');
    $('#txtDesc').val('');
    //$('#txttemplate').val('');

}

function loadTermTable(supList) {
    $('#tblItemdetails').DataTable().destroy();
    debugger;
    $('#tblItemdetails').DataTable({
        data: supList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RowSeq", data: "Sno", "visible": false },
            { title: "TermDetId", data: "TermDetId", "visible": false },
              { title: "TermMasId", data: "TermsId", "visible": false },
            { title: "Term", data: "Terms" },
            { title: "Desc", data: "TermDesc" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnColoredit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function clearTextBox() {
    debugger;
    $('#ddlTerms').val(0);
    $('#txtDesc').val('');
    $('#txttemplate').val('');
    $('#txttemplate').focus();

    $('#btncolorupdate').hide();
    $('#btncoloradd').show();
    Sno = 0;
    Mode = 0;
    TemplateIdonEditMode = 0;

    $('#ddlTerms').siblings('span.error').css('visibility', 'hidden');
    $('#txttemplate').css('border-color', 'lightgrey');


    LoadTermDDL("#ddlTerms");

    var tablestyletemp = $('#tblItemdetails').DataTable();
    tablestyletemp.clear().draw();


    supList = [];
    loadTermTable(supList);

    $('#btnUpdate').hide();
    $('#btnmainDelete').hide();
    $('#btnAdd').show();

}


function Add() {
    debugger;

    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    if (supList.length == 0) {
        alert('Term Template should not be empty...');
        return true;
    }

    if (isAllValid) {
        var TermTempObj = {

            TermDet: supList
        };
        LoadingSymb();
        $.ajax({
            url: "/TermsTemplate/Add",
            data: JSON.stringify(TermTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Data saved successfully...");
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    alert("Data saved failed...");
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function validate() {
    var isValid = true;

    if ($('#txttemplate').val() == '') {
        $('#txttemplate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txttemplate').css('border-color', 'lightgrey');
    }

    return isValid;
}


function loadData() {
    debugger;

    $.ajax({
        type: "GET",
        url: '/TermsTemplate/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tblLoad = json.data;
            var dataset = eval("[" + tblLoad + "]");
       
            LoadMaintab(dataset);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMaintab(maintbllist) {
    debugger;
    var data = [];
    for (var i = 0 ; i < maintbllist.length ; i++) {
        data.push(maintbllist[i]);
    }
    $('#tbody').DataTable({
        data: data,
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
                    { title: "ID", "visible": false },
                    { title: "Term Template" },
                    { title: "Action" },
        ]
    });
}


function getbyID(TermsTempNameId) {
    debugger;

    LoadTermDDL("#ddlTerms");
    $.ajax({
        url: "/TermsTemplate/GetTermEditDetails",
        data: JSON.stringify({ TermsTempNameId: TermsTempNameId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txttemplate').val(obj[0]["TermsTempName"]);             
                GTempMasId = obj[0]["TermsTempNameId"];

                $('#myModal').modal('show');
                $('#btnAdd').hide();
                $('#btnUpdate').show();

                LoadItemDetailsEdit(GTempMasId);
                

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getViewbyID(TermsTempNameId) {
    debugger;

    LoadTermDDL("#ddlTerms");
    $.ajax({
        url: "/TermsTemplate/GetTermEditDetails",
        data: JSON.stringify({ TermsTempNameId: TermsTempNameId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txttemplate').val(obj[0]["TermsTempName"]);
                GTempMasId = obj[0]["TermsTempNameId"];

                $('#myModal').modal('show');
                $('#btnAdd').hide();
                $('#btnUpdate').hide();

                LoadItemDetailsEdit(GTempMasId);


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Delete(TermsTempNameId) {
    debugger;

    LoadTermDDL("#ddlTerms");
    $.ajax({
        url: "/TermsTemplate/GetTermEditDetails",
        data: JSON.stringify({ TermsTempNameId: TermsTempNameId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txttemplate').val(obj[0]["TermsTempName"]);
                GTempMasId = obj[0]["TermsTempNameId"];

                $('#myModal').modal('show');
                $('#btnAdd').hide();
                $('#btnUpdate').hide();
                $('#btnmainDelete').show();

                LoadItemDetailsEdit(GTempMasId);


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadItemDetailsEdit(TermTempID) {
    debugger;

    $.ajax({
        url: "/TermsTemplate/LoadItemEditDetails",
        data: JSON.stringify({ TermsTempNameId: TermTempID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            supList = result;
            loadTermTable(supList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Update() {
    debugger;

    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    if (supList.length == 0) {
        alert('Term Template should not be empty...');
        return true;
    }

    if (isAllValid) {
        var TermTempObj = {

            TermDet: supList
        };
        LoadingSymb();
        $.ajax({
            url: "/TermsTemplate/Update",
            data: JSON.stringify(TermTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Data Updated successfully...");
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    alert("Data saved failed...");
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function TermDelete(ID) {
    debugger;

    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    if (supList.length == 0) {
        alert('Term Template should not be empty...');
        return true;
    }

    if (isAllValid) {
        var TermTempObj = {

            TermDet: supList
        };
        LoadingSymb();
        $.ajax({
            url: "/TermsTemplate/Delete",
            data: JSON.stringify(TermTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Data Deleted successfully...");
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    alert("Data saved failed...");
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}