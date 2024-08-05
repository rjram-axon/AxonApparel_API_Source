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
    public partial class PurOrderReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        string SupplierId = string.Empty;
        string txtFromDate = string.Empty;
        string txtToDate = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PurOrdReport.rdlc");
                PurOrdDataset dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("PurOrdDataset", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public PurOrdDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PoStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SuppID"];
            cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyID"];
            cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 20).Value = Request.QueryString["PoNo"].ToString();
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["Ordno"].ToString();
            cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["Itmid"];
            //cmd.Parameters.Add("@SizeID", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();

            cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();

            cmd.Parameters.Add("@ItemType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();

            cmd.Parameters.Add("@LorImp", SqlDbType.VarChar, 50).Value = Request.QueryString["LType"].ToString();
            sda.SelectCommand = cmd;
            PurOrdDataset ds = new PurOrdDataset();
            sda.Fill(ds, "PurOrdDataset");
            return ds;
        }
    }
}