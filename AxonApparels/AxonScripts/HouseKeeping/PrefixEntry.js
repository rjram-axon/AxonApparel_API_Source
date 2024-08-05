
var PItemList = [];
var Chk = 0;
var Pindex = -1;
var Rindex = 0;
var PCItemList = [];
var Mloadlist = [];
var RItemList = [];
$(document).ready(function () {
    debugger;
    ddlmain();        
});



function ddlmain() {
    debugger;
    var IgId = $('#ddlItemGrp').val();
    $.ajax({
        url: "/PrefixEntry/LoadMaingriddet",
        data: JSON.stringify({ PrefixId: IgId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;     

            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var compdet = {};
                var comp = [];
             
                $.each(obj, function (i, el) {

                    if (!compdet[el.Document_Name]) {
                        compdet[el.Document_Name] = true;
                        comp.push(el);
                    }
                   
                });


                $(ddlItem).empty();         
                           

                $(ddlItem).append($('<option/>').val('0').text('--Select Document Name--'));
                $.each(comp, function () {
                    $(ddlItem).append($('<option></option>').val(this.DocID).text(this.Document_Name));
                });                        
                
                LoadDocumentItemDetails();
            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadDocumentItemDetails() {

    debugger;
    var IgId = $('#ddlItem').val();


    $.ajax({
        url: "/PrefixEntry/LoadDataAlloPurchaseDetails",
        data: JSON.stringify({ PrefixId: IgId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PItemList = result;
            loadPurchaseAllItemTable(PItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function loadPurchaseAllItemTable(PItemList) {

    $('#tblPurchasegrid').DataTable().destroy();
    debugger;

 
    $('#tblPurchasegrid').DataTable({
        data: PItemList,
        scrollY: 400,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [

            { title: "DocId", data: "DocID", "visible": false },
            { title: "Document Name", data: "Document_Name" },
            {

                title: "Prefix", data: "Prefix",
                render: function (data) {

                    return '<input type="text" id="txtPurchaseQty"class="form-control calcQty"  style="width: 50px;text-align: center;"  value=' + data + ' ">';

                },
            },
       

        ]
    });
}

$(document).on('keyup', '.calcQty', function () {
    debugger;
    var table = $('#tblPurchasegrid').DataTable();

    var CSno = table.row($(this).parents('tr')).data()["DocID"];
    var Pre = table.row($(this).parents('tr')).data()["Prefix"];
    var Val = $(this).val();

    if (Val.length != 3) {
        //alert("Prefix should be in three charater only..");
        var msg = 'Prefix should be in three charater only...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        $.each(PItemList, function () {
            if (this.DocID == CSno) {

                for (var t = 0; t < PItemList.length; t++) {
                    if (PItemList[t].DocID == CSno) {

                        var Pre = PItemList[t].Prefix

                        PItemList[t].Prefix = Pre;
                    }
                }
                loadPurchaseAllItemTable(PItemList);
               
            }
        });
        return true;
    } else {




        $.each(PItemList, function () {
            if (this.DocID == CSno) {
                this.Prefix = Val;
            }
        });

        loadPurchaseAllItemTable(PItemList);
    }

});


function AllowUpdate() {
    debugger;


    if (PItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var objPurSubmit = {

        PrefixSetUp: PItemList,

    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/PrefixEntry/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                //alert("Data Updated Sucessfully");
                $('#myModal1').modal('hide');
                //window.location.reload();
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function ClearAllowData() {
    window.location.reload();
}