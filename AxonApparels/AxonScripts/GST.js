var CItemList = [];

$(document).ready(function () {
    Guserid = $("#hdnUserid").data('value');
    loadData();
    
    $(document).on('keyup', '#CGSTper', function (e) {

        debugger;
        //var val = Math.abs(parseInt(this.value, 10) || 0);
        //this.value = val > 25 ? 24 : val;
        if ((this.value) == "" || (this.value) == ".") {
            return true;
        }
        else {
            var val = parseFloat(this.value);
            if ((0 <= val && val <= 100)) {
                return true;
            }
            else {
                //alert("CGSTper value allowed only 0 to 100 ");
                var msg = 'CGST per value allowed only 0 to 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#CGSTper').val("");
                return false;
            }
        }
    });
    $(document).on('keyup', '#SGSTper', function (e) {
        if ((this.value) == "" || (this.value) == ".") {
            return true;
        }
        else {
            var val = parseFloat(this.value);
            if ((0 <= val && val <= 100)) {
                return true;
            }
            else {
                //alert("SGSTper value allowed only 0 to 100 ");
                var msg = 'SGST per value allowed only 0 to 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#SGSTper').val("");
                return false;
            }
        }

    });
    $(document).on('keyup', '#IGSTper', function (e) {
        if ((this.value) == "" || (this.value) == ".") {
            return true;
        }
        else {
            var val = parseFloat(this.value);
            if ((0 <= val && val <= 100)) {
                return true;
            }
            else {
                //alert("IGSTper value allowed only 0 to 100 ");
                var msg = 'IGST per value allowed only 0 to 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#IGSTper').val("");
                return false;
            }
        }
    });

    //$(document).on('keyup', '#GSTtaxcode', function (e) {
    //    debugger;
    //    if ((this.value) == "") {
    //        return true;
    //    }
    //    else {
    //        var val = (this.value);
    //        if ($('#GSTtaxcode').val().length > 6) {               
    //            alert("GSTtaxcode is too long");
    //            return false;
    //        }
    //        else {

    //            return true;
    //        }
    //    }
    //});
});

  


function loadData() {
    $.ajax({
        type: "GET",
        url: '/GST/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            debugger;
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
                "bSort": false,
                columns: [
                         { title: "id", "visible": false },
                         { title: "GST taxcode" },
                         { title: "GST taxdesc" },
                         { title: "CGST per" },
                         { title: "SGST per" },
                         { title: "IGST per " },
                         { title: "Addtaxper", "visible": false },                       
                         { title: "Action" },


                ]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
    function clearTextBox() {
        $('#id').val("");
        $('#GSTtaxcode').val("");
        $('#GSTtaxdesc').val("");
        $('#CGSTper').val("");
        $('#SGSTper').val("");
        $('#IGSTper').val("");
        $('#txtAddtaxper').val("");
        $('#sortorder').val("");
        $('#Type').val("");
        $('#Status').prop('checked', false);
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#id').css('border-color', 'lightgrey');
        $('#GSTtaxcode').css('border-color', 'lightgrey');
        $('#GSTtaxdesc').css('border-color', 'lightgrey');
        $('#CGSTper').css('border-color', 'lightgrey');
        $('#SGSTper').css('border-color', 'lightgrey');
        $('#IGSTper').css('border-color', 'lightgrey');
        $('#txtAddtaxper').css('border-color', 'lightgrey');
        $('#sortorder').css('border-color', 'lightgrey');
        $('#Type').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');

    }

    function Add() {
        var res = validate();
        if (res == false) {
            return false;
        }
        var res2 = validate2();
        if (res2 == false) {
            return false;
        }
        var res4 = validate3();
        if (res4 == false) {
            return false;
        }
        var res3 = validatechk();
        if (res3 == false) {
            return false;
        }
        var res5 = validatetxt();
        if (res5 == false) {
            return false;
        }
        var checkbox_value = "";
        var ischecked = false;
        $(":checkbox").each(function () {
            ischecked = $('#Status').is(":checked");
        });

        if (ischecked == true) {
            checkbox_value = 'A';
        }
        else {
            checkbox_value = '';
        }
        var igstper = "";
        var sgstper = "";
        var cgstper = "";

        if ($('#IGSTper').val() != '') {
            sgstper = 0;
            cgstper = 0;
            igstper = $('#IGSTper').val();
        }
        if ($('#CGSTper').val() != '' && $('#SGSTper').val() != '') {
            sgstper = $('#SGSTper').val();
            cgstper = $('#CGSTper').val();
            igstper = 0;
        }
        debugger;
        var GSTObj = {
            id: $('#id').val(),
            GSTtaxcode: $('#GSTtaxcode').val(),
            GSTtaxdesc: $('#GSTtaxdesc').val(),
            CGSTper: cgstper,
            SGSTper: sgstper,
            IGSTper: igstper,
            Addtaxper: $('#txtAddtaxper').val(),
            sortorder: $('#sortorder').val(),
            Type: $('#Type').val(),
            Ttype: "",
            modifiedby: "",
            enteredby : Guserid,
            rstatus: checkbox_value,
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: '/GST/Add/',
            data: JSON.stringify(GSTObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == 0) {
                    window.location.href = "/Error/GSTIndex";
                } else if (result.Value == -1) {
                    //alert('Given GST is Already Available...');
                    var msg = 'Given GST is Already Available...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    return true;
                }
                else {
                    AddUserEntryLog('Master', 'GST', 'ADD', $('#GSTtaxcode').val());

                    $('#tbody').DataTable().destroy();
                    loadData();
                    $('#myModal').modal('hide');
                    //alert('Data Saved Successfully');
                    var msg = 'Data Saved Successfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);

                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function Update() {
        var id = $('#id').val();
        CheckGSTAllotedforUpdate(id);     
    }

    function CheckGSTAllotedforUpdate(ID) {

        $.ajax({
            url: "/GST/GetGSTRefDetails",
            data: JSON.stringify({ id: ID }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                CItemList = result;
                if (CItemList.length > 0) {

                    for (var x = 0; x < CItemList.length; x++) {

                        var c = CItemList[x].id;

                        if (c > 0) {
                            //alert("GST Is Alloted For Some Other Entry,Please Check it....");
                            var msg = 'GST Is Alloted For Some Other Entry,Please Check it...';
                            var flg = 4;
                            var mode = 1;
                            AlartMessage(msg, flg, mode);
                        }
                        else {
                            var ans = confirm("Are you sure you want to delete this Record?");
                            if (ans) {

                                LoadingSymb();
                                var ischecked = false;
                                var res = validate();
                                if (res == false) {
                                    return false;
                                }
                                var checkbox_value = "";
                                var rstatus = "";
                                $(":checkbox").each(function () {
                                    ischecked = $('#Status').is(":checked");

                                });

                                var GSTObj = {
                                    id: $('#id').val(),
                                    GSTtaxcode: $('#GSTtaxcode').val(),
                                    GSTtaxdesc: $('#GSTtaxdesc').val(),
                                    CGSTper: $('#CGSTper').val(),
                                    SGSTper: $('#SGSTper').val(),
                                    IGSTper: $('#IGSTper').val(),
                                    Addtaxper: $('#Addtaxper').val(),
                                    sortorder: $('#sortorder').val(),
                                    Type: $('#Type').val(),
                                    enteredby: "",
                                    modifiedby: Guserid,
                                    rstatus: ischecked == "False" ? "" : "A",
                                };
                                debugger;
                                $("#btnUpdate").attr("disabled", true);
                                LoadingSymb();
                                $.ajax({
                                    url: "/GST/Update",
                                    data: JSON.stringify(GSTObj),
                                    type: "POST",
                                    contentType: "application/json;charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {

                                        if (result.Status == 'SUCCESS') {
                                            AddUserEntryLog('Master', 'GST', 'UPDATE', $('#GSTtaxcode').val());

                                            $('#tbody').DataTable().destroy();
                                            loadData();
                                            $('#myModal').modal('hide');
                                            $('#id').val(""),
                                            $('#GSTtaxcode').val(""),
                                            $('#GSTtaxdesc').val(""),
                                            $('#CGSTper').val(""),
                                            $('#SGSTper').val(""),
                                            $('#IGSTper').val(""),
                                            $('#Addtaxper').val(""),
                                            $('#sortorder').val(""),
                                            $('#Type').val(""),
                                            $('#Status').prop("checked", false);
                                            //alert('Data Updated Successfully');
                                            var msg = 'Data Updated Successfully...';
                                            var flg = 1;
                                            var mode = 0;
                                            AlartMessage(msg, flg, mode);
                                            $("#btnUpdate").attr("disabled", false);
                                        }
                                        else if (result.Status == 'EXISTS') {
                                            //alert('Given GST is Already Available...');
                                            var msg = 'Given GST is Already Available...';
                                            var flg = 4;
                                            var mode = 1;
                                            AlartMessage(msg, flg, mode);
                                            return true;
                                        }
                                        else {
                                            window.location.href = "/Error/GSTIndex";
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


    function Delete(id) {
        debugger;
        $.ajax({
            url: "/GST/getbyID/" + id,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#GSTtaxcode').val(obj.GSTtaxcode);
                CheckGSTAlloted(id);

            },
            error: function (errormessage) {
                alert('delete failed..');
            }
        });

        
    }

    function CheckGSTAlloted(ID) {

        $.ajax({
            url: "/GST/GetGSTRefDetails",
            data: JSON.stringify({ id: ID }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                CItemList = result;
                if (CItemList.length > 0) {

                    for (var x = 0; x < CItemList.length; x++) {

                        var c = CItemList[x].id;

                        if (c > 0) {
                            //alert("GST Is Alloted For Some Other Entry,Please Check it....");
                            var msg = 'GST Is Alloted For Some Other Entry,Please Check it...';
                            var flg = 4;
                            var mode = 1;
                            AlartMessage(msg, flg, mode);
                        }
                        else {
                            var ans = confirm("Are you sure you want to delete this Record?");
                            if (ans) {
                                LoadingSymb();
                                $.ajax({
                                    url: "/GST/Delete/" + ID,
                                    type: "POST",
                                    contentType: "application/json;charset=UTF-8",
                                    dataType: "json",
                                    success: function (result) {

                                        if (result.Value == 1) {
                                            $('#tbody').DataTable().destroy();
                                            AddUserEntryLog('Master', 'GST', 'DELETE', $('#GSTtaxcode').val());
                                            loadData();
                                        }
                                        else {
                                            window.location.href = "/Error/GSTIndex";
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


    function validate() {
        debugger;
        var isValid = true;

        if (($('#IGSTper').val().trim() == 0 )||($('#IGSTper').val().trim() < 0 )) {
            $('#IGSTper').val("");
        }
        if (($('#SGSTper').val().trim() == 0) || ($('#SGSTper').val().trim() < 0)) {
            $('#SGSTper').val("");
        }
        if (($('#CGSTper').val().trim() == 0) || ($('#SGSTper').val().trim() < 0)) {
            $('#CGSTper').val("");
        }

        if ($('#GSTtaxcode').val().trim() == "") {
            $('#GSTtaxcode').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#GSTtaxcode').css('border-color', 'lightgrey');
        }
        if ($('#GSTtaxdesc').val().trim() == "") {
            $('#GSTtaxdesc').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#GSTtaxdesc').css('border-color', 'lightgrey');
        }
        //if ($('#CGSTper').val().trim() == "" ) {
        //    $('#CGSTper').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#CGSTper').css('border-color', 'lightgrey');
        //}
        //if ($('#SGSTper').val().trim() == "") {
        //    $('#SGSTper').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#SGSTper').css('border-color', 'lightgrey');
        //}
        //if ($('#IGSTper').val().trim() == "") {
        //    $('#IGSTper').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#IGSTper').css('border-color', 'lightgrey');
        //}

        


        if ($('#IGSTper').val().trim() == "" && $('#SGSTper').val().trim() == "" && $('#CGSTper').val().trim() == "") {
            $('#IGSTper').css('border-color', 'Red');
            $('#SGSTper').css('border-color', 'Red');
            $('#CGSTper').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#IGSTper').css('border-color', 'lightgrey');
            $('#SGSTper').css('border-color', 'lightgrey');
            $('#SGSTper').css('border-color', 'lightgrey');
        }


       





        //if ($('#txtAddtaxper').val().trim() == "") {
        //    $('#txtAddtaxper').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#txtAddtaxper').css('border-color', 'lightgrey');
        //}
        //if ($('#sortorder').val().trim() == "") {
        //    $('#sortorder').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#sortorder').css('border-color', 'lightgrey');
        //}
        //if ($('#Type').val().trim() == "") {
        //    $('#Type').css('border-color', 'Red');
        //    isValid = false;
        //}
        //else {
        //    $('#Type').css('border-color', 'lightgrey');
        //}

        return isValid;
    }
    function validate2() {
        var isValid = true;

        if ($('#IGSTper').val().trim() == 0) {
            $('#IGSTper').val("");
        }
        if ($('#SGSTper').val().trim() == 0) {
            $('#SGSTper').val("");
        }
        if ($('#CGSTper').val().trim() == 0) {
            $('#CGSTper').val("");
        }

        if ($('#CGSTper').val().trim() == "" && $('#SGSTper').val().trim() != "") {
            $('#CGSTper').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#CGSTper').css('border-color', 'lightgrey');
        }
        if ($('#CGSTper').val().trim() != "" && $('#SGSTper').val().trim() == "") {
            $('#SGSTper').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#SGSTper').css('border-color', 'lightgrey');
        }
        return isValid;

    }
    function validate3() {
        var isValid = true;

        if ($('#IGSTper').val().trim() == 0) {
            $('#IGSTper').val("");
        }
        if ($('#SGSTper').val().trim() == 0) {
            $('#SGSTper').val("");
        }
        if ($('#CGSTper').val().trim() == 0) {
            $('#CGSTper').val("");
        }

        if ($('#CGSTper').val().trim() != "" && $('#SGSTper').val().trim() != "" && $('#IGSTper').val().trim() != "") {
            //alert("Please fill either CGSTper,SGSTper or IGSTper");
            var msg = 'Please fill either CGST per,SGST per or IGST per...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            isValid = false;
        }
        return isValid;

    }
    function validatechk() {
        var isValid = true;

        if ($('#Status').prop("checked") == false) {
            isValid = false;
            //alert("Checkbox is Unchecked.");
            var msg = 'Checkbox is Unchecked...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
        }
        return isValid;
    }
    function validatetxt() {
        var isValid = true;
        debugger;
        if ($('#GSTtaxcode').val().length > 6) {
            isValid = false;
            //alert("GSTtaxcode is too long");
            var msg = 'GST taxcode is too long...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
        }
        return isValid;
    }


    function getbyID(id) {
        debugger;

        $('#id').css('border-color', 'lightgrey');
        $('#GSTtaxcode').css('border-color', 'lightgrey');
        $('#GSTtaxdesc').css('border-color', 'lightgrey');
        $('#CGSTper').css('border-color', 'lightgrey');
        $('#SGSTper').css('border-color', 'lightgrey');
        $('#IGSTper').css('border-color', 'lightgrey');
        $('#Addtaxper').css('border-color', 'lightgrey');
        $('#sortorder').css('border-color', 'lightgrey');
        $('#Type').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');

        $.ajax({
            url: "/GST/GetByID/" + id,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                   $('#id').val(obj.id),
                   $('#GSTtaxcode').val(obj.GSTtaxcode),
                   $('#GSTtaxdesc').val(obj.GSTtaxdesc),
                   $('#CGSTper').val(obj.CGSTper),
                   $('#SGSTper').val(obj.SGSTper),
                   $('#IGSTper').val(obj.IGSTper),
                   $('#sortorder').val(obj.sortorder),
                   $('#Type').val(obj.Type),
                   $('#txtAddtaxper').val(obj.Addtaxper)
                    

                   if (obj.rstatus == "A") {
                        $('#Status').prop("checked", true);
                    } else {
                        $('#Status').prop("checked", false);
                    }
                    debugger;
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

    function getViewbyID(id) {
        debugger;

        $('#id').css('border-color', 'lightgrey');
        $('#GSTtaxcode').css('border-color', 'lightgrey');
        $('#GSTtaxdesc').css('border-color', 'lightgrey');
        $('#CGSTper').css('border-color', 'lightgrey');
        $('#SGSTper').css('border-color', 'lightgrey');
        $('#IGSTper').css('border-color', 'lightgrey');
        $('#Addtaxper').css('border-color', 'lightgrey');
        $('#sortorder').css('border-color', 'lightgrey');
        $('#Type').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');

        $.ajax({
            url: "/GST/GetByID/" + id,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    $('#id').val(obj.id),
                    $('#GSTtaxcode').val(obj.GSTtaxcode),
                    $('#GSTtaxdesc').val(obj.GSTtaxdesc),
                    $('#CGSTper').val(obj.CGSTper),
                    $('#SGSTper').val(obj.SGSTper),
                    $('#IGSTper').val(obj.IGSTper),
                    $('#sortorder').val(obj.sortorder),
                    $('#Type').val(obj.Type),
                    $('#txtAddtaxper').val(obj.Addtaxper)


                    if (obj.rstatus == "A") {
                        $('#Status').prop("checked", true);
                    } else {
                        $('#Status').prop("checked", false);
                    }
                    debugger;
                    $('#myModal').modal('show');
                    $('#btnUpdate').hide();
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
