var buylist = [];
var Mainlist = [];
$(document).ready(function () {
    debugger;
    loadData();
    LoadBuyerDDL('#ddlbuyer');
    $('#btnchrgadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;
        if ($('#ddlbuyer').val() == "0") {
            isAllValid = false;
            $('#ddlbuyer').css('border-color', 'Red');
        }
        else {
            $('#ddlbuyer').css('border-color', 'lightgrey');
        }
        if ($('#txtfromqty').val() == "") {
            isAllValid = false;
            $('#txtfromqty').css('border-color', 'Red');
        }
        else {
            $('#txtfromqty').css('border-color', 'lightgrey');
        }

        if ($('#txttoqty').val() == "") {
            isAllValid = false;
            $('#txttoqty').css('border-color', 'Red');
        }
        else {
            $('#txttoqty').css('border-color', 'lightgrey');
        }
       
        if (buylist.length == 0) {
            leng = 1;
         
        }
        else {
            leng = buylist.length + 1;
           
        }

        if (isAllValid) {

            var ListObj = {
                Slno: leng,
                BuyerId: $('#ddlbuyer').val(),
                FromQuantity: $('#txtfromqty').val(),
                ToQuantity: $("#txttoqty").val(),
                ShippingExpense: $('#txtshipexp').val(),
                CIFExpense: $("#txtcifexp").val(),
                BankExpense: $('#txtbankexp').val(),
               
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            buylist.push(ListObj);

            loadchrgeTable(ListObj);
            fnClearBuyControls();
        }
    });
    $(document).on('click', '.btnbuyedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = buylist.slice(rowindex);

        $('#txtfromqty').val(currentro12[0]['FromQuantity']);
        $('#txttoqty').val(currentro12[0]['ToQuantity']);
        $('#txtshipexp').val(currentro12[0]['ShippingExpense']);
        $('#txtcifexp').val(currentro12[0]['CIFExpense']);
        $('#txtbankexp').val(currentro12[0]['BankExpense']);
        


        $('#btnchrgadd').hide();
        $('#btnchrgupdate').show();
    });
    $('#btnchrgupdate').click(function () {
        debugger;
        var currentrowsel = buylist.slice(rowindex);

        currentrowsel[0]['FromQuantity'] = $("#txtfromqty").val();
        currentrowsel[0]['ToQuantity'] = $("#txttoqty").val();
        currentrowsel[0]['ShippingExpense'] = $("#txtshipexp").val();
        currentrowsel[0]['CIFExpense'] = $("#txtcifexp").val();
        currentrowsel[0]['BankExpense'] = $("#txtbankexp").val();      

       
        buylist[rowindex] = currentrowsel[0];
       
        loadchrgeTable(buylist);

        $('#btnchrgupdate').hide();
        $('#btnchrgadd').show();

      
        fnClearBuyControls();
       


    });
    $(document).on('click', '.btnbuyremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = buylist.slice(rowindex);

        Sno = currentrowsel[0]['Slno'];

        buylist.splice(rowindex, 1);
        document.getElementById("tblbuydetails").deleteRow(rowindex + 1);
    });
    $(document).on('click', '.btnedit', function () {
  
        debugger;
        rowindex = $(this).closest('tr').index();

        var currentrowsel = Mainlist.slice(rowindex);

        var Buyid = currentrowsel[0]['BuyerId'];
        getbyId(Buyid);
    });
    $(document).on('click', '.btnremove', function () {
  
        debugger;
        rowindex = $(this).closest('tr').index();

        var currentrowsel = Mainlist.slice(rowindex);

        var Buyid = currentrowsel[0]['BuyerId'];
        deletebyId(Buyid);
    });
});

function clearTextBox() {
   
    $('#ddlbuyer').empty();
    buylist = [];
    loadchrgeTable(buylist);
    LoadBuyerDDL('#ddlbuyer');

    $('#btnAdd').show();
    $('#btnDelete').hide();
    $('#btnUpdate').hide();
}
function deletebyId(id) {
    debugger;
    $.ajax({
        url: "/BuyerCharges/getbyId",
        data: JSON.stringify({ Buyerid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#myModal2').modal('show');

            $('#btnAdd').hide();
            $('#btnUpdate').hide();
            $('#btnDelete').show();
            $('#ddlbuyer').val(result[0].BuyerId);
            buylist = result;
            loadchrgeTable(buylist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function getbyId(id) {
    debugger;
    $.ajax({
        url: "/BuyerCharges/getbyId",
        data: JSON.stringify({ Buyerid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#myModal2').modal('show');

            $('#btnAdd').hide();
            $('#btnDelete').hide();
            $('#btnUpdate').show();
            $('#ddlbuyer').val(result[0].BuyerId);
            buylist = result;
            loadchrgeTable(buylist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function getViewbyID(id) {
    debugger;
    $.ajax({
        url: "/BuyerCharges/getbyId",
        data: JSON.stringify({ Buyerid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#myModal2').modal('show');

            $('#btnAdd').hide();
            $('#btnDelete').hide();
            $('#btnUpdate').hide();
            $('#ddlbuyer').val(result[0].BuyerId);
            buylist = result;
            loadchrgeTable(buylist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function fnClearBuyControls() {

    $('#txtfromqty').val("");
    $('#txttoqty').val('');
    $('#txtshipexp').val('');
    $('#txtcifexp').val('');
    $('#txtbankexp').val('');
  

}
function loadchrgeTable(list) {
    debugger;
    $('#tblbuydetails').DataTable().destroy();

    $('#tblbuydetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: buylist,
        //scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
             { title: "SNo", data: "Slno","visible":false },
            { title: "BuyerId", data: "BuyerId", "visible": false },
            { title: "From Quantity", data: "FromQuantity" },
            { title: "To Quantity", data: "ToQuantity" },
            { title: "Shipping Expense", data: "ShippingExpense" },
            { title: "CIF Expense", data: "CIFExpense" },
            { title: "Bank Expense", data: "BankExpense" },          

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbuyedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbuyremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblbuydetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblbuydetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });




}
function valibuy() {
  

    var BuyerId = $('#ddlbuyer').val();
       


   
    //adddet(list);
    $.ajax({
        url: "/BuyerCharges/Checkbuy",
        data: JSON.stringify({ buyid: BuyerId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.BuyerId > 0) {
                
                alert('Data Already Exists...');
                $('#ddlbuyer').val('0');

            }
            

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function Add() {
    debugger;

    var list = {
       
        BuyerId: $('#ddlbuyer').val(),
        ListDetails: buylist,

        
    }
    //adddet(list);
    LoadingSymb();
    $.ajax({
        url: "/BuyerCharges/AddMas",
        data: JSON.stringify(list),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                alert('Data Saved Successfully');
                window.location.href = "/BuyerCharges/BuyerChargesIndex";
            }
            if (result.Value == 0) {

                alert('Data not saved properly');
               
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function Update() {
    debugger;

    var list = {

        BuyerId: $('#ddlbuyer').val(),
        ListDetails: buylist,


    }
    //adddet(list);
    LoadingSymb();
    $.ajax({
        url: "/BuyerCharges/Update",
        data: JSON.stringify(list),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                alert('Data Updated Successfully');
                window.location.href = "/BuyerCharges/BuyerChargesIndex";
            }
            if (result.Value == 0) {

                alert('Data not saved properly');

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function Delete() {
    debugger;

    var list = {

        BuyerId: $('#ddlbuyer').val(),
        ListDetails: buylist,


    }
    //adddet(list);
    LoadingSymb();
    $.ajax({
        url: "/BuyerCharges/Delete",
        data: JSON.stringify(list),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                alert('Data Deleted Successfully');
                window.location.href = "/BuyerCharges/BuyerChargesIndex";
            }
            if (result.Value == 0) {

                alert('Data not saved properly');

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function loadData() {
    $.ajax({
        url: "/BuyerCharges/LoadMaingrid",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            Mainlist = obj;
            LoadMaingrid(obj);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function LoadMaingrid(list) {
    $('#tbody').DataTable().destroy();
    debugger;
    $('#tbody').DataTable({
        data: list,
        columns: [
            { title: "Id", data: "BuyerId", "visible": false },
            
              { title: "Buyer", data: "Buyer" },
               {
                   title: "Action",  "mDataProp": null,
                   
                       "sDefaultContent": '<div style="display: inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button></div> '
                  
               }
        ]
    });
}
