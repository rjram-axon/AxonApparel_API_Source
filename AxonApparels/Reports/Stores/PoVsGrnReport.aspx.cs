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
    public partial class PoVsGrnReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PoVsGrnReport.rdlc");
                PoVsGrnDataset dsCustomers = GetData();
                GRN_ReportDataSet dsCustomers1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("PoVsGrnStatement", dsCustomers.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("GRN_ReportStatement", dsCustomers1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }
        public PoVsGrnDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PoVsGrn", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            //{
            cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["CompanyID"];

            cmd.Parameters.Add("@BuyerId", SqlDbType.Int).Value = Request.QueryString["BuyID"];
          
            cmd.Parameters.Add("@SuppId", SqlDbType.Int).Value = Request.QueryString["SuppID"];
           
            cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 50).Value = Request.QueryString["PoNo"].ToString();
           
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();

            cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();
          
            cmd.Parameters.Add("@ItemType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();
          
            cmd.Parameters.Add("@LorImp", SqlDbType.VarChar, 50).Value = Request.QueryString["LType"].ToString();
            sda.SelectCommand = cmd;
            PoVsGrnDataset ds = new PoVsGrnDataset();
            sda.Fill(ds, "PoVsGrnDataset");
            return ds;
        }

        public GRN_ReportDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GRN_Report", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            //{
            cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["CompanyID"];

            cmd.Parameters.Add("@BuyerId", SqlDbType.Int).Value = Request.QueryString["BuyID"];

            cmd.Parameters.Add("@SuppId", SqlDbType.Int).Value = Request.QueryString["SuppID"];

            cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 50).Value = Request.QueryString["PoNo"].ToString();

            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();

            cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();

            cmd.Parameters.Add("@ItemType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();

            cmd.Parameters.Add("@LorImp", SqlDbType.VarChar, 50).Value = Request.QueryString["LType"].ToString();
            sda.SelectCommand = cmd;
            GRN_ReportDataSet ds = new GRN_ReportDataSet();
            sda.Fill(ds, "GRN_ReportDataSet");
            return ds;
        }

    }
}