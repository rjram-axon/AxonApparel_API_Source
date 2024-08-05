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
namespace AxonApparels.Reports
{
    public partial class BuyerOrderReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Order/BuyerOrderReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Curr", Request.QueryString["Curr"].ToString());
                ReportParameter rp2 = new ReportParameter("Total", Request.QueryString["Total"].ToString());
                BuyerOrderDataset ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("BuyerOrderstatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 });
            }
        }
        public BuyerOrderDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrderReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            cmd.Parameters.Add("@seasonid", SqlDbType.Int).Value = Request.QueryString["SeasonID"];
            cmd.Parameters.Add("@refno", SqlDbType.VarChar, 100).Value = Request.QueryString["Refno"].ToString();
            cmd.Parameters.Add("@ordno", SqlDbType.VarChar, 100).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["StyleID"];
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            cmd.Parameters.Add("@Dttype", SqlDbType.Char, 1).Value = Request.QueryString["Dttype"].ToString();
            cmd.Parameters.Add("@Statustype", SqlDbType.Char, 1).Value = Request.QueryString["statustype"].ToString();
            sda.SelectCommand = cmd;
            BuyerOrderDataset ds = new BuyerOrderDataset();
            sda.Fill(ds, "BuyerOrderDataset");
            return ds;
        }
        public CompanyDetStatementDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
           
            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }
    }
}