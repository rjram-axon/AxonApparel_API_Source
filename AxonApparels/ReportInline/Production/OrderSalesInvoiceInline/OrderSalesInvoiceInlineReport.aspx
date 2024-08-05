<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OrderSalesInvoiceInlineReport.aspx.cs" Inherits="AxonApparels.ReportInline.Production.OrderSalesInvoiceInline.OrderSalesInvoiceInlineReport" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
   <div class="row">
        <div class="col-md-12">
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
