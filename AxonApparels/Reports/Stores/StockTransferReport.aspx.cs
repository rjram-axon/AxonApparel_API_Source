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
    public partial class StockTransferReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StocktransferReport.rdlc");
                StocktransferDataset dsCustomers = GetData();
                ReportParameter rp1 = new ReportParameter("GroupByView", Request.QueryString["GroupByView"].ToString());
                ReportDataSource datasource = new ReportDataSource("StocktransferStatement", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public StocktransferDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockTransferReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FCmpID", SqlDbType.Int).Value = Request.QueryString["FCmpID"];
            cmd.Parameters.Add("@TCmpID", SqlDbType.Int).Value = Request.QueryString["TCmpID"];
            cmd.Parameters.Add("@FOrdNo", SqlDbType.Int).Value = Request.QueryString["FOrdNo"];
            cmd.Parameters.Add("@TOrdNo", SqlDbType.Int).Value = Request.QueryString["TOrdNo"];
            cmd.Parameters.Add("@ProcId", SqlDbType.Int).Value = Request.QueryString["ProcId"];
            cmd.Parameters.Add("@FStrID", SqlDbType.Int).Value = Request.QueryString["FStrID"];
            cmd.Parameters.Add("@TStrID", SqlDbType.Int).Value = Request.QueryString["TStrID"];
            cmd.Parameters.Add("@IGrp", SqlDbType.VarChar, 50).Value = Request.QueryString["IGrp"].ToString();
            cmd.Parameters.Add("@protype", SqlDbType.VarChar, 5).Value = Request.QueryString["protype"].ToString();
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
    
            sda.SelectCommand = cmd;
            StocktransferDataset ds = new StocktransferDataset();
            sda.Fill(ds, "StocktransferDataset");
            return ds;
        }
    }
}