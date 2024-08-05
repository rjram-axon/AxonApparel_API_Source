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
    public partial class StockLedgerReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StockLedgerReport.rdlc");
                StockLedgerDataset ds = GetData();
                ReportDataSource datasource = new ReportDataSource("StockLedgerStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public StockLedgerDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockLedgerReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
            cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@ItGroup", SqlDbType.VarChar, 100).Value = Request.QueryString["ItGroup"].ToString();
            cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
            cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItemID"];
            cmd.Parameters.Add("@SizeID", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            cmd.Parameters.Add("@GrnNo", SqlDbType.VarChar, 20).Value = Request.QueryString["GrnNo"].ToString();
            cmd.Parameters.Add("@OrdRefNo", SqlDbType.VarChar, 100).Value = Request.QueryString["OrdRefNo"].ToString();
            cmd.Parameters.Add("@ProcessID", SqlDbType.Int).Value = Request.QueryString["ProcessID"];
            cmd.Parameters.Add("@StoreID", SqlDbType.Int).Value = Request.QueryString["StoreID"];
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 50).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 50).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            StockLedgerDataset ds = new StockLedgerDataset();
            sda.Fill(ds, "StockLedgerDataset");
            return ds;
        }
    }
}