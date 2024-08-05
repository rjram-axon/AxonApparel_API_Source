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

namespace AxonApparels.Reports.Order
{
    public partial class P3EntryStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Order/P3EntryStatementReport.rdlc");
                P3EntryDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("P3EntryStatement", ds.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public P3EntryDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_P3EntryStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Buymasid", SqlDbType.Int).Value = Request.QueryString["BMasid"];

            //cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            P3EntryDataSet ds = new P3EntryDataSet();
            sda.Fill(ds, "P3EntryDataSet");
            return ds;
        }
    }
}