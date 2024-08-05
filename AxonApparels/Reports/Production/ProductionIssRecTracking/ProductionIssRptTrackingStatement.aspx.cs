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

namespace AxonApparels.Reports.Production
{
    public partial class ProductionIssRptTrackingStatement : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Production/ProductionIssRecTracking/ProductionIssRptTrackingStatement.rdlc");
                ProdIssueRecptTrackingDataSet ds = GetData();
                //ProcessIssueReceiptTrackDataSet ds1 = GetData1();

                ReportDataSource datasource = new ReportDataSource("ProdIssueRecptTrackingStatement", ds.Tables[1]);
                //ReportDataSource datasource1 = new ReportDataSource("ProcessIssueReceiptTrackStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                //ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }

        public ProdIssueRecptTrackingDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdIssueRecptTracking", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandTimeout = 300;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
            cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
            cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
            cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];
            cmd.Parameters.Add("@IssueNo", SqlDbType.VarChar,30).Value = Request.QueryString["IssuNo"];
            sda.SelectCommand = cmd;
            ProdIssueRecptTrackingDataSet ds = new ProdIssueRecptTrackingDataSet();
            sda.Fill(ds, "ProdIssueRecptTrackingDataSet");
            return ds;
        }


        //public ProcessIssueReceiptTrackDataSet GetData1()
        //{
        //    string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
        //    con = new SqlConnection(conString);
        //    SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssRecptTrackStatementDet", con);
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
        //    cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
        //    cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
        //    cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
        //    cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
        //    cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
        //    cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
        //    cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
        //    cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
        //    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];
        //    sda.SelectCommand = cmd;
        //    ProcessIssueReceiptTrackDataSet ds = new ProcessIssueReceiptTrackDataSet();
        //    sda.Fill(ds, "ProcessIssueReceiptTrackDataSet");
        //    return ds;
        //}
    }
}