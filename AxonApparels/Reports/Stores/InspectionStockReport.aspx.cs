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
    public partial class InspectionStockReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/InspectionStockReport.rdlc");
                ReportParameter rp1 = new ReportParameter("FromDate", Request.QueryString["FromDate"].ToString());
                InspectionStockDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("InspectionStockRptStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public InspectionStockDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_InspectionStockRpt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            cmd.Parameters.Add("@refid", SqlDbType.Int).Value = Request.QueryString["Ref"];

            cmd.Parameters.Add("@clrid", SqlDbType.Int).Value = Request.QueryString["Color"];

            cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];

            cmd.Parameters.Add("@fabid", SqlDbType.Int).Value = Request.QueryString["Fabid"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 10).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@fromdate", SqlDbType.Date, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            InspectionStockDataSet ds = new InspectionStockDataSet();
            sda.Fill(ds, "InspectionStockDataSet");
            return ds;
        }
    }
}