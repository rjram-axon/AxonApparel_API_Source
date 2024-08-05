<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FabricStockReport.aspx.cs" Inherits="AxonApparels.Reports.Stores.FabricStockReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="~/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        @media print {
            .myDivToPrint {
                background-color: white;
                height: 100%;
                width: 100%;
                position: fixed;
                top: 0;
                left: 0;
                margin: 0;
                padding: 15px;
                font-size: 14px;
                line-height: 18px;
            }
        }
    </style>
</head>
<script>
    function printdiv(printpage) {
        debugger;
        var report = document.getElementById("<%=ReportViewer1.ClientID %>");
        var div = report.getElementsByTagName("DIV");
        var newstr;
        for (var i = 0; i < div.length; i++) {
            if (div[i].id.indexOf("VisibleReportContent") != -1) {
                newstr = div[i].innerHTML;
                break;
            }
        }
        var headstr = "<html><body>";
        var footstr = "</body>";
        //var newstr = document.all.item(printpage).innerHTML;
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = headstr + newstr + footstr;

        window.print();
        document.body.innerHTML = oldstr;
        return false;
    }

</script>
<body>
    <div class="row">
        <div class="col-md-12">
              <div class="row" style="margin: 5px 0 0 15px;">
                <button id="btnPrint"  class="btn btn-primary" onClick="printdiv('div_print');" style="padding: 1px 12px;" > Print </button>
               <%-- <input type="button" id="btnPrint" value="Print" class="btn btn-primary" onClick="printdiv('div_print');" />--%>
            </div>
            <form id="form1" runat="server">
                <div style="width: 1075px; margin-left: 124px;">
                    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Height="600px" ShowBackButton="True" Visible="True" ValidateRequestMode="Enabled" BackColor="White" Style="background-image: none" AsyncRendering="False"></rsweb:ReportViewer>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
