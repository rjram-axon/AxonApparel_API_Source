<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OpenInvoiceReport.aspx.cs" Inherits="AxonApparels.Reports.Stores.OpenInvoiceReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<%--<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>--%>

<body>
    <div class="row">
        <div class="col-md-12">
            <div class="row" style="margin: 5px 0 0 15px;">
                <button id="btnPrint" class="btn btn-primary" onclick="printdiv2();" style="padding: 1px 12px;">Print</button>
                
                  <div class=" " style="display:inline-block;font-family:Verdana;font-size:8pt;vertical-align:top;">
						<table cellpadding="0" cellspacing="0">
							<tbody><tr>
								<td height="28px"><div id="ReportViewer1_ctl05_ctl04_ctl00" style="font-family: Verdana; font-size: 8pt; border: 1px solid transparent; background-color: transparent; cursor: default;">
									<table id="ReportViewer1_ctl05_ctl04_ctl00_Button" title="Export drop down menu">
										<tbody><tr>
											<td><a id="ReportViewer1_ctl05_ctl04_ctl00_ButtonLink" title="Export drop down menu" alt="Export drop down menu" href="javascript:void(0)" style="text-decoration: none; cursor: pointer;"><img id="ReportViewer1_ctl05_ctl04_ctl00_ButtonImg" src="/Reserved.ReportViewerWebControl.axd?OpType=Resource&amp;Version=11.0.2802.16&amp;Name=Microsoft.Reporting.WebForms.Icons.Export.gif" alt="Export drop down menu" style="border-style:None;height:16px;width:16px;"><span style="width:5px;text-decoration:none;"> </span><img id="ReportViewer1_ctl05_ctl04_ctl00_ButtonImgDown" src="/Reserved.ReportViewerWebControl.axd?OpType=Resource&amp;Version=11.0.2802.16&amp;Name=Microsoft.Reporting.WebForms.Icons.ArrowDown.gif" alt="Export drop down menu" style="border-style:None;height:6px;width:7px;margin-bottom:5px;"></a></td>
										</tr>
									</tbody></table>
								</div><div id="ReportViewer1_ctl05_ctl04_ctl00_Menu" style="background-color:White;border:1px #336699 Solid;display:none;position:absolute;padding:1px;z-index:1;">
									<div style="border:1px transparent Solid;">
										<a title="Excel" alt="Excel" onclick="$find('ReportViewer1').exportReport('EXCELOPENXML');" href="javascript:void(0)" style="color: rgb(51, 102, 204); font-family: Verdana; font-size: 8pt; padding: 3px 8px 3px 32px; display: block; white-space: nowrap; text-decoration: none;">Excel</a>
									</div><div style="border:1px transparent Solid;">
										<a title="PDF" alt="PDF" onclick="$find('ReportViewer1').exportReport('PDF');" href="javascript:void(0)" style="color: rgb(51, 102, 204); font-family: Verdana; font-size: 8pt; padding: 3px 8px 3px 32px; display: block; white-space: nowrap; text-decoration: none;">PDF</a>
									</div><div style="border:1px transparent Solid;">
										<a title="Word" alt="Word" onclick="$find('ReportViewer1').exportReport('WORDOPENXML');" href="javascript:void(0)" style="color: rgb(51, 102, 204); font-family: Verdana; font-size: 8pt; padding: 3px 8px 3px 32px; display: block; white-space: nowrap; text-decoration: none;">Word</a>
									</div>
								<div style="position: absolute; z-index: -1; top: 0px; left: 0px; width: 26px; opacity: 0.05; background-color: black;"></div></div></td>
							</tr>
						</tbody></table>
					</div>
               
                <%-- <input type="button" id="btnPrint" value="Print" class="btn btn-primary" onClick="printdiv('div_print');" />--%>
            </div>
             <br />

          

               <br />

            <form id="form1" runat="server">
                <%-- <div style="width: 1075px; margin-left: 124px;">
                    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Height="600px" ShowBackButton="True" Visible="True" ValidateRequestMode="Enabled" BackColor="White" Style="background-image: none" AsyncRendering="False" ShowPrintButton="true"></rsweb:ReportViewer>
                </div>--%>

                <div style="width: 100%; margin-left:54px;" >
                    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Height="600px" SizeToReportContent="true"  ShowBackButton="True" Visible="True" ValidateRequestMode="Enabled" BackColor="White" Style="background-image: none" AsyncRendering="False" ShowPrintButton="true">
                        

                    </rsweb:ReportViewer>
                    

                </div>
            </form>
        </div>
    </div>
</body>

<head id="Head1" runat="server">
    <title></title>
    <script src="../../../jquery/dist/jquery.js"></script>
    <script src="../../../jquery/dist/jquery.min.js"></script>
    <link href="~/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <script src="../../../jquery-printthis/printThis.js"></script>

    <script>
        $(document).ready(function () {
            debugger;
            $('table table  ').removeAttr('style');
            $('table table table ').removeAttr('style');
            $('table table table table').removeAttr('style');
            $('table table table table table').removeAttr('style');
            $(' table table table table table tbody  tr td').removeAttr('style');
            $("td:empty").remove();
            //$('td').removeAttr('style');
            //$('tbody').removeAttr('style');
        });


        function printdiv2() {

            $("#VisibleReportContentReportViewer1_ctl09").printThis({
                debug: false,
                importCSS: true,
                importStyle: true,
                printContainer: true,
                removeInline: false,
                printDelay: 1500,
                header: null,
                formValues: true,
                //loadCSS: "../jquery-printthis/printfooter.css",
                //footer:    "Page "
            });


        }

    </script>

    <style>

        @media print
        {

            body
            {
                zoom: 100%;
               height:auto;
               break-inside: avoid;
            }
          
              tr {
                 
        page-break-inside:initial;
         page-break-after:avoid;
         page-break-before:avoid;
        
            }
            table
            {
                 break-inside: avoid;
            }

        }

        table table table table table
        {
            width: 100%;
            min-width: 100%;
            page-break-after:avoid;
        }

            table table table table table tbody tr td
            {
                max-width: 100%;
                min-width: 100%;
               height:auto;
            }
           

        table table table table
        {
            width: 100%;
            min-width: 100%;
        }

        table table table
        {
            width: 100%;
            min-width: 100%;
        }

        table table
        {
            width: 100%;
            min-width: 100%;
        }
        #ReportViewer1_ctl05
        {
            display:none;
        }

     

         table.print-friendly tr td, table.print-friendly tr th {
        page-break-inside: avoid;
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


    function printDiv() {
        debugger;
        var printContents = document.getElementById('VisibleReportContentReportViewer1_ctl09').innerHTML;
        window.document.write('</head><body >');
        window.document.write(printContents);
        window.document.write('<style> table table table table table  { width: 100%;  min-width: 100%; background-color:black;  } table table table table table tbody tr td   {  max-width: 100%;  min-width: 100%; border-color:white; font-family:Calibri; font-size:11px; background-color:white; border:0.5px solid black; }</style>');
        window.document.write('<style> table table table table {  width: 100%;  min-width: 100%; border:1px solid black;  }  table table table  { width: 100%; min-width: 100%;  } table table   { width: 100%; min-width: 100%; border:1   }</style>');
        window.document.write('</body></html>');
        window.print();

    }

</script>

</html>
