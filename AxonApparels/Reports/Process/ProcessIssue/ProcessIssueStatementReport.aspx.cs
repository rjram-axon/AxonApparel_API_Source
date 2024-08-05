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

namespace AxonApparels.Reports.Process.ProcessIssue
{
    public partial class ProcessIssueStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessIssue/ProcessIssueStatementReport.rdlc");
                ProcessIssueDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessIssueStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public ProcessIssueDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssueStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FDate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@TDate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@CompanyUnitId", SqlDbType.Int).Value = Request.QueryString["unitid"];
            cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
            cmd.Parameters.Add("@Refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
            cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["itmid"];
            cmd.Parameters.Add("@clrid", SqlDbType.Int).Value = Request.QueryString["Color"];
            cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["jmasid"];
            cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();


            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
           
            sda.SelectCommand = cmd;
            ProcessIssueDataSet ds = new ProcessIssueDataSet();
            sda.Fill(ds, "ProcessIssueDataSet");
            return ds;
        }
    }
}