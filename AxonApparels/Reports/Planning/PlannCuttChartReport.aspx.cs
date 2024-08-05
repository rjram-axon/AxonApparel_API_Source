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
    public partial class PlannCuttChartReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/PlannCuttChartReport.rdlc");
                PlannCuttChartDetDataSet ds = GetData();
                PlannCuttChartColSizDataSet ds1 = GetData1();
                CompanyDetStatementDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("PlannCuttChartDetStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlannCuttChartColSizStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CompanyDetStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
            }
        }

        public PlannCuttChartDetDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannCuttChartStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Orderno", SqlDbType.VarChar, 50).Value = Request.QueryString["Ordno"].ToString();
            cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["Buyerid"];

            sda.SelectCommand = cmd;
            PlannCuttChartDetDataSet ds = new PlannCuttChartDetDataSet();
            sda.Fill(ds, "PlannCuttChartDetDataSet");
            return ds;
        }
        public PlannCuttChartColSizDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannCuttChartColSizStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Orderno", SqlDbType.VarChar, 50).Value = Request.QueryString["Ordno"].ToString();
            cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["Buyerid"];

            sda.SelectCommand = cmd;
            PlannCuttChartColSizDataSet ds = new PlannCuttChartColSizDataSet();
            sda.Fill(ds, "PlannCuttChartColSizDataSet");
            return ds;
        }
        public CompanyDetStatementDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["Compid"];

            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }
    }
}