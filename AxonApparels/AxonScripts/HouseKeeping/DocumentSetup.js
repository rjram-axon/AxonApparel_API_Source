
var MainItemList = [];
var Detlist = [];
var setupid = 0;
var RptOpt = [];
var RptEmail = [];
var RptProc = [];
var MOrd = 0;

$(document).ready(function () {
    debugger;
    LoadEmployeeDDL("#ddlSupp");
    loadData();
    $(document).on('click', '.btnSelect', function () {
        debugger;
        $('#myModal').show();
        $('#myModal').modal('show');

        var table = $('#tbody').DataTable();
        var Docname = table.row($(this).parents('tr')).data()["Doc_Title"];
        loaddetdata(Docname);
    });



    $("select").mousedown(function (e) {
        e.preventDefault();

        var select = this;
        var scroll = select.scrollTop;

        e.target.selected = !e.target.selected;

        setTimeout(function () { select.scrollTop = scroll; }, 0);

        $(select).focus();
    }).mousemove(function (e) { e.preventDefault() });

    $('#btnSuppadd').click(function () {
        debugger;


        $('#CList1').show();

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlSupp').val() == "0") {
            isAllValid = false;
            $('#ddlSupp').css('border-color', 'Red');
        }
        else {
            $('#ddlSupp').css('border-color', 'lightgrey');
        }

        var sid = $('#ddlSupp').val();
        for (var d = 0; d < RptEmail.length; d++) {
            if (RptEmail[d].Employeeid == sid) {
                //alert('Must be different employee...');
                var msg = 'Must be different employee...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                fnClearControls();
                return true;
            }
        }

        if (RptEmail.length == 0) {
            leng = 1;
        }
        else {
            leng = RptEmail.length + 1;
        }

        SupSno = leng;

        // SupId = $('#ddlSupp').val();
        Supp = $("#ddlSupp option:selected").text();



        if (isAllValid) {


            debugger;
            var ListObj = {
                Employee: $("#ddlSupp option:selected").text(),
                Employeeid: $('#ddlSupp').val(),
                SlNo: leng,
                Rpt_Setupid: setupid,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            RptEmail.push(ListObj);

            loadEmpTable(RptEmail);

            fnClearControls();
        }
    });

    $(document).on('click', '.btnsupedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();
        var currentro12 = RptEmail.slice(rowindex);
        $('#ddlSupp').val(currentro12[0]['Employeeid']);

        $('#btnSuppadd').hide();
        $('#btnSuppupdate').show();
    });



    $('#btnSuppupdate').click(function () {
        debugger;
        var currentrowsel = RptEmail.slice(rowindex);

        currentrowsel[0]['Employeeid'] = $("#ddlSupp").val();
        currentrowsel[0]['Employee'] = $("#ddlSupp option:selected").text();


        RptEmail[rowindex] = currentrowsel[0];

        loadEmpTable(RptEmail);

        $('#btnSuppupdate').hide();
        $('#btnSuppadd').show();

        if (Mode == 0) {
            fnClearControls();
        }
        else {
            fnClearControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnsupremove', function () {
        rowindex = $(this).closest('tr').index();
        RptEmail.splice(rowindex, 1);
        document.getElementById("tblSupdetails").deleteRow(rowindex + 1);
    });
});


function fnClearControls() {
    debugger;
    $('#ddlSupp').val("0");


}
function loadEmpTable(list) {
    debugger;
    $('#tblSupdetails').DataTable().destroy();

    list.sort(function (a, b) {
        return a.SlNo - b.SlNo;
    });

    $('#tblSupdetails').DataTable({
        data: list,
        //bSort: false,
        columns: [
            { title: "Slno", data: "SlNo", "visible": false },
            { title: "EmployeeId", data: "Employeeid", "visible": false },
            { title: "Employee", data: "Employee", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button>'

                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupItemview btn btn-round btn-info"> <i class="fa fa-eye"> </button> '

               },

        ]
    });

}

//Load Data function
function loadData() {
    debugger;
    $.ajax({
        url: "/DocumentSetUp/GetRptOption",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            MainItemList = result;
            LoadMaingrid(MainItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function LoadMaingrid(MainItemList) {
    $('#tbody').DataTable().destroy();
    $('#tbody').DataTable({
        data: MainItemList,
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
                 { title: "Report ID", data: "Rpt_PID", "visible": false },
                 { title: "Document", data: "Doc_Title" },
                 { title: "Type", data: "Doc_Type" },
                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> </div>'

                 },
        ]
    });

    $("#tbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loaddetdata(Docname) {
    debugger;
    $.ajax({
        url: "/DocumentSetUp/GetRptDet",
        data: JSON.stringify({ docname: Docname }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            Detlist = result;
            $('#btnUpdate').show();
            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.optionname));

            });

            var valArr = [101, 102];
            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (Detlist[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + Detlist[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + Detlist[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + Detlist[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + Detlist[i].optionid + "']").attr("selected", false);
                }
            }


            $('#txtrepttitle').val(obj[0].Rpt_Title);
            $('#text1').val(obj[0].Rpt_Prepared);
            $('#text2').val(obj[0].Rpt_Verified);
            $('#text3').val(obj[0].Rpt_forwarded);
            $('#text4').val(obj[0].Rpt_Approved);

            $('#txtheader').val(obj[0].rpt_Header);
            $('#txtfooter').val(obj[0].Rpt_Remarks);
            $('#txtstdtext').val(obj[0].Rpt_StdCode);
            $('#txtstdtext2').val(obj[0].RPT_STDCODE2);
            setupid = obj[0].Rpt_Setupid;
            loadempdetdata(Docname);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadempdetdata(Docname) {
    debugger;
    $.ajax({
        url: "/DocumentSetUp/GetRptEmpDet",
        data: JSON.stringify({ docname: Docname }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            RptEmail = result;
            loadEmpTable(RptEmail);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Update() {
    debugger;
    RptOpt = [];
    $('#sbTwo :selected').each(function (i, sel) {
        //alert($(sel).val());
        var obj = {
            optionid: $(sel).val(),
            setupid: setupid,
            optionvalue:1
        }
        RptOpt.push(obj);

    });

    var ObjAdd = {
        Rpt_Setupid: setupid,
        Rpt_Title: $('#txtrepttitle').val(),
        Rpt_StdCode: $('#txtstdtext').val(),
        Rpt_forwarded: $('#text3').val(),
        Rpt_Verified: $('#text2').val(),
        Rpt_Prepared: $('#text1').val(),
        Rpt_Approved: $('#text4').val(),
        RPT_STDCODE2: $('#txtstdtext2').val(),
        rpt_Header: $('#txtheader').val(),
        Rpt_Remarks: $('#txtfooter').val(),    
        RptOptDet: RptOpt,
        RptEmailDet: RptEmail,
        RptProcDet: RptProc,
    }
    LoadingSymb();
    $.ajax({
        url: "/DocumentSetUp/Update",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Updated Successfully');
                //window.location.href = "/DocumentSetUp/DocumentSetUpIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/DocumentSetUp/DocumentSetUpIndex";
                AlartMessage(msg, flg, mod, ur);
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