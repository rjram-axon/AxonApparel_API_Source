
var Imglist = [];
var mainlist = [];
var mailrowindex = -1;
var filerowindex = -1;
var Masid = 0;
var MailItems = [];
var filelist = [];
$(document).ready(function () {
    MainFDate = $("#hdMainFromDate").data('value');
    //$('#myModal').modal('show');
     getDate();
    //$('#myModal').modal('show');
     LoadMailMainList();



     $(document).on('click', '.btnmailedit', function () {
         debugger;
         // Mode = 1;

         mailrowindex = $(this).closest('tr').index();

         var currentro12 = mainlist.slice(mailrowindex);

         var mailid = currentro12[0]['ID'];
         Masid = mailid;
         LoadGetbyid(mailid);
         LoadMailFileList(mailid);
         //$('#ddlTrimslist').val(currentro12[0]['Itemid']).trigger('change');
         //$('#ddlColorlist').val(currentro12[0]['Colorid']).trigger('change');
         //$('#ddlSizelist').val(currentro12[0]['Sizeid']).trigger('change');
         //$('#ddlUOMlist').val(currentro12[0]['UOMid']).trigger('change');
         //Gitemid = currentro12[0]['GItemid'];
         //Itemid = currentro12[0]['Itemid'];
         //Colorid = currentro12[0]['Colorid'];
         //Sizeid = currentro12[0]['Sizeid'];
         //$('#myModal').modal('show');
         //$('#btntrimsadd').hide();
         //$('#btntrimsupdate').show();
     });
     $(document).on('click', '.btnfiledownload', function () {
         debugger;
         // Mode = 1;

         filerowindex = $(this).closest('tr').index();

         var currentro12 = filelist.slice(filerowindex);

         var id = currentro12[0]['ID'];
         var Filepath = currentro12[0]['FailPath'];

         var url = "/Mail/DownloadFile?filePath=" + Filepath;

         window.location = url;

     });


})
function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate()+1;
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    fdate = Fdatestring;

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
}


function LoadGetbyid(id) {
    debugger;
  

    $.ajax({
        url: "/Mail/LoadMailEdit",
        type: "POST",
        data: JSON.stringify({ masid: id}),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            MailItems = (result.Value);
            $('#myModal').modal('show');
            $('#ID').val(MailItems[0].ID);
            $('#Date').val(MailItems[0].Date);
            $('#To').val(MailItems[0].To);
            $('#ToName').val(MailItems[0].ToName);
            $('#Subject').val(MailItems[0].Subject);
            $('#Body').val(MailItems[0].Body);
            $('#Email').val(MailItems[0].Email);
            $('#FromName').val(MailItems[0].FromName);
            $('#passwrd').hide();
            $('#attach').hide();
            $('#btnsent').hide();
            $('#filetabl').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}




function LoadMailMainList() {
    debugger;

    var fromname = "";
    var tarNo = $('select#ddlFrommail option:selected').val();

    if (tarNo == 0) {
        fromname == "";
    }
    else {

        fromname = $('select#ddlFrommail option:selected').text();
    }

    var toname = "";
    var tNo = $('select#ddlTomail option:selected').val();

    if (tNo == 0) {
        toname == "";
    }
    else {

        toname = $('select#ddlTomail option:selected').text();
    }


    //var fromname = $('#txtFromMail').val();
    //var toname = $('#txtTomail').val();
    var fromdt = $('#txtFromDate').val();
    var todt = $('#txtToDate').val();

    $.ajax({
        url: "/Mail/LoadMailMainList",
        type: "POST",
        data: JSON.stringify({ FromName: fromname, ToName: toname, frmdate: fromdt, todate: todt }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            mainlist = (result.Value);

            loadmainTable(mainlist);
            loadddlFrommail();
            loadddlTomail();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadmainTable(mainlist) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tbody').DataTable().destroy();
    }
    $('#tbody').empty();
    //mainlist.sort(function (a, b) {
    //    return a.TrimsSlNo - b.TrimsSlNo;
    //})
    $('#tbody').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: mainlist,
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
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "ID", data: "ID", "visible": false },
            { title: "From Name", data: "FromName" },
            { title: "To Name", data: "ToName" },
            {
                title: "Date", data: "Date", render: function (data) {
                    return (moment(data).format("DD/MM/YYYY hh:mm:ss a"));
                }
            },
            { title: "Status", data: "Pending", "visible": false },
         
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmailedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmailremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadMailFileList(id) {
    debugger;
    $.ajax({
        url: "/Mail/LoadMailFileEdit",
        type: "POST",
        data: JSON.stringify({ masid: id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            filelist = (result.Value);

            loadfileTable(filelist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadfileTable(filelist) {
    debugger;
    var inputcount = 0;
    $('#tblattach tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#tblattach').DataTable().destroy();
    }
    $('#tblattach').empty(); 
    $('#tblattach').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: filelist,
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
            { title: "ID", data: "ID", "visible": false },
            { title: "file id ", data: "FileId", "visible": false },
            { title: "FIle", data: "FileName" },
            { title: "FilePath", data: "FailPath", "visible": false },
               {
                   title: "Download", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfiledownload btn btn-round btn-warning"> <i class="fa fa-download"></i> </button> </div>'
               }
        ]
    });


    $("#tblattach tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblattach tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function clearTextBox() {
    $('#ID').val('');
    $('#Date').val('');
    $('#To').val('');
    $('#ToName').val('');
    $('#Subject').val('');
    $('#Body').val('');
    $('#Email').val('');
    $('#FromName').val('');
    $('#passwrd').show();
    $('#attach').show();
    $('#btnsent').show();
    $('#filetabl').hide();
}




function sentmail() {

    $("#MailForm").submit();

    //var Imgtitle = ''
    //var path = '';
    //for (var d = 0; d < nametxt.length; d++) {

    //    var res1 = [];
    //    res1 = nametxt[d].FilePath.split("/");


    //    path = nametxt[d].FilePath;
    //    Imgtitle = res1[2];

    //}



    //var objSubmit = {
    //    From: $('#txtFrommail').val(),
    //    To: $('#txtTomail').val(),
    //    Subject: $('#txtSubject').val(),
    //    Body: $('#txtBody').val(),
       
    //};
    //$("#ConAdd").attr("disabled", true);
    //LoadingSymb();
    //$.ajax({
    //    url: "/Mail/Index",
    //    data: JSON.stringify(objSubmit),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {

    //        if (result.Value == true) {

    //            alert("Mil sent Sucessfully");
               
    //        } else {

    //            window.location.href = "/Error/Index";


    //        }

    //    },
    //    error: function (errormessage) {

    //        alert(errormessage.responseText);
    //    }
    //});
}

function addses() {
    var SizeObj = {
        Buyordimg: Imglist
    };
    $.ajax({
        url: "/StyleEntry/AddSession",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            GetFiles();
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
            GetFiles();
        }
    });
}

function GetFiles() {
    debugger;

    var url = "/StyleEntry/GetFiles";
    var Id = $('input#ID').val();
    url = url + "?id=" + Id
    $.get(url, function (response) {
        $('#uploadsContainer').html(response);
    });
}

function loadddlFrommail() {


    var data = mainlist;
    var tardet = {};
    var tar = [];

    $.each(data, function (i, el) {

        if (!tardet[el.Email]) {
            tardet[el.Email] = true;
            tar.push(el);
        }
        $(ddlFrommail).empty();

        $(ddlFrommail).append($('<option/>').val('0').text('--Select FromEmail--'));
        $.each(tar, function () {
            $(ddlFrommail).append($('<option></option>').val(this.ID).text(this.Email));
        });

    });
}

function loadddlTomail() {


    var data = mainlist;
    var tardet = {};
    var tar = [];

    $.each(data, function (i, el) {

        if (!tardet[el.To]) {
            tardet[el.To] = true;
            tar.push(el);
        }
        $(ddlTomail).empty();

        $(ddlTomail).append($('<option/>').val('0').text('--Select ToEmail--'));
        $.each(tar, function () {
            $(ddlTomail).append($('<option></option>').val(this.ID).text(this.To));
        });

    });
}