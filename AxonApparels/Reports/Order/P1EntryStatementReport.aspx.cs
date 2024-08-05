using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Globalization;
using Microsoft.Reporting.WebForms;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports;
using System.IO;

namespace AxonApparels.Reports.Order
{
    public partial class P1EntryStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Order/P1EntryStatementReport.rdlc");
                P1EntryDataSet ds = GetData();
                P1EntryRptDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("P1EntryStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("P1EntryRptStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);

                
                //ReportDocument report = new ReportDocument();
                //report.Load(Server.MapPath(@"~/Reports/Order/P1Entry.rpt"));
                //report.FileName = Server.MapPath(@"~/Reports/Order/P1Entry.rpt");                
                //report.SetParameterValue("@Buymasid", Request.QueryString["BMasid"]);

                //MemoryStream oStream; // using System.IO 
                //oStream = (MemoryStream)report.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                //Response.Clear();
                //Response.Buffer = true;
                //Response.ContentType = "application/pdf";
                //Response.BinaryWrite(oStream.ToArray());
                //Response.Flush();
                //Response.End();      
                          
                
            }
        }
        public P1EntryDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_P1EntryStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Buymasid", SqlDbType.Int).Value = Request.QueryString["BMasid"];

            //cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            P1EntryDataSet ds = new P1EntryDataSet();
            sda.Fill(ds, "P1EntryDataSet");
            return ds;
        }
        public P1EntryRptDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_P1EntryRptStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Buymasid", SqlDbType.Int).Value = Request.QueryString["BMasid"];

            //cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            P1EntryRptDataSet ds = new P1EntryRptDataSet();
            sda.Fill(ds, "P1EntryRptDataSet");
            return ds;
        }
    }
}