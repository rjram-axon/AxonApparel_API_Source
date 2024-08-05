/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var id;
$(document).ready(function () {
    loadData();
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    $("<span class=\"pip\">" +
                      "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                      "<br/><span class=\"remove\">Remove image</span>" +
                      "</span>").insertAfter("#files");
                    $(".remove").click(function () {
                        $(this).parent(".pip").remove();
                    });

                    // Old code here
                    /*$("<img></img>", {
                      class: "imageThumb",
                      src: e.target.result,
                      title: file.name + " | Click to remove"
                    }).insertAfter("#files").click(function(){$(this).remove();});*/

                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }

    $('#btnadddoc').click(function () {
        debugger;
        if (window.FormData !== undefined) {

            var fileUpload = $("#files").get(0);
            var files = fileUpload.files;

            //Create FormData object  
            var fileData = new FormData();

            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }

            //  Adding one more key to FormData object  
            // fileData.append('username', ‘Manas’);  
            //var nam = [];
            //nam = files[0].name;

            $.ajax({
                url: "/CommDoc/NewProject/" ,
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: fileData,                        
                success: function (result) {
                    debugger;
                    alert("Saved");
                },
                error: function (err) {
                    alert(err.statusText);
                }

            });
        }
    });
});
   
function SaveImg(id)
{
    debugger;
    if (window.FormData !== undefined) {  
  
        var fileUpload = $("#files").get(0);  
        var files = fileUpload.files;  
              
        // Create FormData object  
        var fileData = new FormData();  
        var nam = [];
        var tot = [];
        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            nam = files[i].name;
          // tot.push(nam);
      

            var obj = {
                Entryid: id,
                //Entryid: $('#txtcommunid').val(),
                Docname: nam,
                Doctitle: 'G'
            }
            LoadingSymb();
            $.ajax({
                url: '/CommDoc/Add/',
                type: "POST",
                data: JSON.stringify({ str: obj }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert(result);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
            }
       
    } else {  
        alert("FormData is not supported.");  
    }  
}

//Load Data function
function loadData() {
    $.ajax({
        type: "GET",
        url: '/Communication/List/',
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
                columns: [
                         { title: "ID", "visible": false },
                         { title: "Company Name" },
                         { title: "Ref No" },
                         { title: "Inward" },
                         //{ title: "Status" },
                         { title: "Action" },
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ddlselect() {
    debugger;
    if ($("#rdbuyer").is(":checked") == true) {
        $('#ddltype').empty();
        LoadBuyerDDL('#ddltype');
    }
    else if ($("#rdsupplier").is(":checked") == true) {

        $('#ddltype').empty();
        LoadSupplierDDL('#ddltype');
    }
    else if ($("#rdagent").is(":checked") == true) {
        $('#ddltype').empty();
        LoadAgentDDL('#ddltype');
    }
}
//Function for clearing the textboxes
function clearTextBox() {
    
    $('#txtcommunid').val("");
    $('#ddlcompany').empty();
    $('#txtentryno').val("");
    $('#txtentrydate').val("");
    $('#txtcommrefno').val("");
    $('#txtrefdate').val("");
    $('#txtother').val("");
    $('#ddltype').val("");
    $('#rdbuyer').val("");
    $('#ddlsupplier').val("");
    $('#rdagent').val("");
    $('#rdother').val("");
    $('#ddlcommtype').val("");
    $('#txtfrom').val("");
    $('#txtto').val("");
    $('#ddlcommMode').val("");
    $('#txtsubject').val("");
    $('#txtdescription').val("");
    $('#txtenquiryno').val("");
    $('#txtrefno').val("");
    $('#rdreplied').val("");
    $('#rdnoreplied').val("");
    
    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#txtcommunid').css('border-color', 'lightgrey');
    $('#ddlcompany').css('border-color', 'lightgrey');
    $('#ddlbuyer').css('border-color', 'lightgrey');
    $('#txtentryno').css('border-color', 'lightgrey');
    $('#txtentrydate').css('border-color', 'lightgrey');
    $('#txtcommrefno').css('border-color', 'lightgrey');
    $('#txtrefdate').css('border-color', 'lightgrey');
    $('#ddlcommtype').css('border-color', 'lightgrey');
    $('#txtfrom').css('border-color', 'lightgrey');
    $('#txtto').css('border-color', 'lightgrey');
    $('#ddlcommMode').css('border-color', 'lightgrey');
    $('#txtsubject').css('border-color', 'lightgrey');
    $('#txtdescription').css('border-color', 'lightgrey');
    $('#txtenquiryno').css('border-color', 'lightgrey');
    $('#txtrefno').css('border-color', 'lightgrey');
    $('#txtother').css('border-color', 'lightgrey');
    $('#ddltype').css('border-color', 'lightgrey');
    $('#rdreplied').css('border-color', 'lightgrey');
    $('#rdnoreplied').css('border-color', 'lightgrey');

    //Change city to Buyer once Buyer Controller Created
    //LoadCityDDL("#Buyer");

    //$('#txtdate').val(moment(new Date()).format('DD/MM/YYYY'));
    //$('#txtquodate').val(moment(new Date()).format('DD/MM/YYYY'));
    //$('#txtnextfollow').val(moment(new Date()).format('DD/MM/YYYY'));
    debugger;
    LoadCompanyDDL("#ddlcompany");
    ddlselect();
   
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtentryno').val().trim() == "") {
        $('#txtentryno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtentryno').css('border-color', 'lightgrey');
    }

    //groupdropdown = $('#ddlgroup');
    //if (groupdropdown.length == 0 || $(groupdropdown).val() == "") {
    //    $('#ddlgroup').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlgroup').css('border-color', 'lightgrey');
    //}
    return isValid;
}

//Function for getting the Data Based upon FollowUp ID
function getbyID(ItemID) {
    $('#ddlcompany').empty();
    LoadCompanyDDL("#ddlcompany");

    $('#txtcommunid').css('border-color', 'lightgrey');
    $('#GetCommunication').css('border-color', 'lightgrey');
    $('#txtentryno').css('border-color', 'lightgrey');
    $('#txtentrydate').css('border-color', 'lightgrey');
    $('#txtcommrefno').css('border-color', 'lightgrey');
    $('#txtrefdate').css('border-color', 'lightgrey');

    $('#ddlcommtype').css('border-color', 'lightgrey');
    $('#txtfrom').css('border-color', 'lightgrey');
    $('#txtto').css('border-color', 'lightgrey');
    $('#ddlcommMode').css('border-color', 'lightgrey');
    $('#txtsubject').css('border-color', 'lightgrey');
    $('#txtdescription').css('border-color', 'lightgrey');
    $('#txtenquiryno').css('border-color', 'lightgrey');
    $('#txtrefno').css('border-color', 'lightgrey');
    $('#rdreplied').css('border-color', 'lightgrey');
    $('#rdnoreplied').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Communication/getbyID/" + ItemID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtcommunid').val(obj.CommunicationId);
                $('#ddlcompany').val(obj.CompanyId);
                $('#txtentryno').val(obj.EntryNo);
                $('#txtentrydate').val(moment(obj.EntryDate).format('DD/MM/YYYY'));
                $('#txtcommrefno').val(obj.RefNo);
                $('#txtfrom').val(moment(obj.From).format('DD/MM/YYYY'));
                $('#txtto').val(moment(obj.To).format('DD/MM/YYYY'));
                $('#ddlcommtype').val(obj.CompanyType);
                $('#ddlcommMode').val(obj.ComModeTypeId);
                $('#txtsubject').val(obj.Subject);
                $('#txtdescription').val(obj.Description);
                
                //$('#txtrefno').val(obj.RefNo);
                if (obj.EnquiryNo != undefined && obj.EnquiryNo != 0) {
                    //$("#rdenquiry").checked = true;
                    $("#rdenquiry").prop('checked', true);
                    $('#txtenquiryno').val(obj.EnquiryNo);
                    //$('#lblenqno').text = "Enquiry No";
                    lblenqno.textContent = "Enquiry No";
                }
                else if (obj.OrderNo!= undefined && obj.OrderNo!= 0)
                {
                    //$("#rdorder").checked = true;
                    $("#rdorder").prop('checked', true);
                    $('#txtrefno').val(obj.OrderRefNo);
                    $('#txtenquiryno').val(obj.OrderNo);
                    //$('#lblenqno').text = "Order No";
                    lblenqno.textContent = "Order No";
                }
                else if (obj.MiscRefNo != undefined && obj.MiscRefNo != 0) {
                    //$("#rdmisc").checked = true;
                    $("#rdmisc").prop('checked', true);
                    $('#txtenquiryno').val(obj.MiscRefNo);
                    //$('#lblenqno').text = "Ref No";
                    lblenqno.textContent = "Ref No";
                }
                else if (obj.Inward != undefined) {
                    //$("#rdmisc").checked = true;
                    $("#rdmisc").prop('checked', true);
                    $('#txtenquiryno').val(obj.MiscRefNo);
                }
                //$('#rdreplied').val(obj.ToContact);                
                //$('#rdnoreplied').val(obj.NextFollowDate);
                //$('#txtremarks').val(obj.Remarks);
                debugger;
                //id = obj.CommunicationId;
                //if (obj.CommunicationId > 0) {
                    var idd = obj.CommunicationId;
                    getimage(idd);
               // }
               // SaveImg();
                $('#myModal').modal('show');
                
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function getimage(id)
{
    debugger;
    $.ajax({
        url: "/CommDoc/GetbyID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

        }
    });
}
//Add Data Function 
function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var buyerid, supplierid, agentid, others;    
    if ($("#rdbuyer").is(":checked") == true)
    { buyerid = $('#ddltype').val(); }
    //else { buyerid = 3; }
   else if ($("#rdsupplier").is(":checked") == true)
    { supplierid = $('#ddltype').val(); }
    //else { supplierid = 12; }
    else if ($("#rdagent").is(":checked") == true)
    { agentid = $('#ddltype').val(); }
    //else { agentid = 14; }
   else if ($("#rdother").is(":checked") == true)
    { others = $('#ddltype').val(); }
    //else { others = 0; }

    var EnquiryNo,OrderNo,MiscNo;
    if ($("#rdenquiry").is(":checked") == true) { EnquiryNo = $('#txtenquiryno').val(); } else { EnquiryNo = 0; }
    if ($("#rdorder").is(":checked") == true) { OrderNo = $('#txtenquiryno').val(); } else { OrderNo = 0; }
    if ($("#rdmisc").is(":checked") == true) { MiscNo = $('#txtenquiryno').val(); } else { MiscNo = 0; }

    var inward;
    if ($("#rdreplied").is(":checked") == true) { inward = 'R'; } else { inward = 'N' }

    var ItemObj = {
        CommunicationId: $('#txtcommunid').val(),
        CompanyId:$('#ddlcompany').val(),
        EntryNo: $('#txtentryno').val(),
        EntryDate: new Date($('#txtentrydate').val()),
        RefNo: $('#txtcommrefno').val(),
        RefDate: new Date($('#txtrefdate').val()),
        BuyerId: buyerid,
       // BuyerId: $('#rdbuyer').val(),
        SupplierId: supplierid,
        AgentId:agentid,
        Others: others,
        EnquiryNo:EnquiryNo,// $('#txtenquiryno').val(),
        OrderNo:OrderNo,// $('#txtenquiryno').val(),
        OrderRefNo: $('#txtrefno').val(),
        MiscRefNo:MiscNo,// $('#txtenquiryno').val(),
        CompanyType: $('#ddlcommtype').val(),
        From: new Date( $('#txtfrom').val()),
        To: new Date( $('#txtto').val()),
        ComModeTypeId: $('#ddlcommMode').val(),
        Subject: $('#txtsubject').val(),
        Description: $('#txtdescription').val(),
        Inward: inward,
        //Remarks: $('#txttocontact').val(),
        //Remarks: $('#txtremarks').val(),        
    };
    LoadingSymb();
    $.ajax({
        url: "/Communication/Add",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
           var i=result.Value
            
            $('#tbody').DataTable().destroy();
            loadData();
            SaveImg(i);
            $('#myModal').modal('hide');
            clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating Followup record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var buyerid, supplierid, agentid, others;
    if ($("#rdbuyer").is(":checked") == true) { buyerid = $('#ddltype').val(); } else { buyerid = 0; }
    if ($("#rdsupplier").is(":checked") == true) { supplierid = $('#ddltype').val(); } else { supplierid = 0; }
    if ($("#rdagent").is(":checked") == true) { agentid = $('#ddltype').val(); } else { agentid = 0; }
    if ($("#rdother").is(":checked") == true) { others = $('#ddltype').val(); } else { others = 0; }

    var EnquiryNo, OrderNo, MiscNo;
    if ($("#rdenquiry").is(":checked") == true) { EnquiryNo = $('#txtenquiryno').val(); } else { EnquiryNo = 0; }
    if ($("#rdorder").is(":checked") == true) { OrderNo = $('#txtenquiryno').val(); } else { OrderNo = 0; }
    if ($("#rdmisc").is(":checked") == true) { MiscNo = $('#txtenquiryno').val(); } else { MiscNo = 0; }

    var inward;
    if ($("#rdreplied").is(":checked") == true) { inward = 'R'; } else { inward = 'N' }

    var ItemObj = {
        CommunicationId: $('#txtcommunid').val(),
        CompanyId:  $('#ddlcompany').val(),
        EntryNo: $('#txtentryno').val(),
        EntryDate: new Date($('#txtentrydate').val()),
        RefNo: $('#txtcommrefno').val(),
        RefDate: new Date($('#txtrefdate').val()),
        BuyerId: buyerid,
        SupplierId: supplierid,
        AgentId: agentid,
        Others: others,
        EnquiryNo: EnquiryNo,// $('#txtenquiryno').val(),
        OrderNo: OrderNo,// $('#txtenquiryno').val(),
        OrderRefNo: $('#txtrefno').val(),
        MiscRefNo: MiscNo,// $('#txtenquiryno').val(),
        CompanyType: $('#ddlcommtype').val(),
        From: new Date( $('#txtfrom').val()),
        To: new Date($('#txtto').val()),
        ComModeTypeId: $('#ddlcommMode').val(),
        Subject: $('#txtsubject').val(),
        Description: $('#txtdescription').val(),
        Inward: inward,        
        //Remarks: $('#txtremarks').val(),        
    };
    LoadingSymb();
    $.ajax({
        url: "/Communication/Update",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            obj = result.Value;
            $('#myModal').modal('hide');
            $('#tbody').DataTable().destroy();
            loadData();
            if (obj.CommunicationId > 0) {
                var idd = obj.CommunicationId;
                $.ajax({
                    url: "/CommDoc/Update/" + idd,
                    typr: "GET",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;

                    }
                });
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting Followup record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Communication/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#tbody').DataTable().destroy();
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function loadimg()
{
    debugger;
    //$('#imgfile').multifile({
   // $('#imgfile').click({
        //function() {

    $("#imgfile").function({

        uploader: 'scripts/uploader.swf',
        cancelImg: 'images/cancel.png',
        buttonText: 'Browse Files',
        script: 'Upload.ashx',
        folder: 'uploads',
        fileDesc: 'Image Files',
        fileExt: '*.jpg;*.jpeg;*.gif;*.png',
        multi: true,
        auto: true

    });
}