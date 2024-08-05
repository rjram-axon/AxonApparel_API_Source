using Microsoft.Reporting.WebForms;
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

namespace AxonApparels.Reports.Planning
{
    public partial class TrimsStockReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/TrimsStockReport.rdlc");
                TrimsStockMainDataSet ds = GetData();
                TrimsStockDetailDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("TrimsStockMainStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("TrimsStockDetailStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
            
        }
        public TrimsStockMainDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_TrimsStockMainRptStmnt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.Int).Value = Request.QueryString["Masid"];
        
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            TrimsStockMainDataSet ds = new TrimsStockMainDataSet();
            sda.Fill(ds, "TrimsStockMainDataSet");
            return ds;
        }
        public TrimsStockDetailDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_TrimsStockDetailRptStmnt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            cmd.Parameters.Add("@refid", SqlDbType.Int).Value = Request.QueryString["Refno"];
            cmd.Parameters.Add("@buyid", SqlDbType.Int).Value = Request.QueryString["Buyer"];
            cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Item"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 10).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            TrimsStockDetailDataSet ds = new TrimsStockDetailDataSet();
            sda.Fill(ds, "TrimsStockDetailDataSet");
            return ds;
        }
    }
}