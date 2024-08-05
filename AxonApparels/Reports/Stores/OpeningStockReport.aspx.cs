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

namespace AxonApparels.Reports.Stores
{
    public partial class OpeningStockReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/OpeningStockReport.rdlc");
                OpenStockReportDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("OpenStockReportStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public OpenStockReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockOpeningReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
            cmd.Parameters.Add("@ManuID", SqlDbType.Int).Value = Request.QueryString["ManuID"];
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@ItGroup", SqlDbType.VarChar, 100).Value = Request.QueryString["ItmGrp"].ToString();
            cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyID"];
            cmd.Parameters.Add("@ColID", SqlDbType.Int).Value = Request.QueryString["ColID"];
            cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItmID"];
            cmd.Parameters.Add("@OrdRefNo", SqlDbType.VarChar, 100).Value = Request.QueryString["OrdRefNo"].ToString();
            cmd.Parameters.Add("@StoreID", SqlDbType.Int).Value = Request.QueryString["StorID"];
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 50).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 50).Value = Request.QueryString["ToDate"].ToString();
            cmd.Parameters.Add("@OrdType", SqlDbType.Char, 1).Value = Request.QueryString["OrdType"].ToString();
            sda.SelectCommand = cmd;
            OpenStockReportDataSet ds = new OpenStockReportDataSet();
            sda.Fill(ds, "OpenStockReportDataSet");
            return ds;
        }
    }
}