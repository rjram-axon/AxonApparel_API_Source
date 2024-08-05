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
namespace AxonApparels.Reports.Planning
{
    public partial class BudgetReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/BudgetReport.rdlc");
                BudgetReportGetDataSet ds1 = GetData();
                CompanyDetStatementDataSet ds2 = GetData1();
                ReportDataSource datasource = new ReportDataSource("BudgetReportGetStatement", ds1.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4 });
            }
        }
        public BudgetReportGetDataSet GetData()
        {
                string conString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_BudgetReportGet", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@compid", SqlDbType.Int).Value = Request.QueryString["CompId"];
                cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["styleid"];
                cmd.Parameters.Add("@jobordno", SqlDbType.VarChar, 50).Value = Request.QueryString["jobno"].ToString();
                cmd.Parameters.Add("@ordno", SqlDbType.VarChar, 100).Value = Request.QueryString["ordno"].ToString();
                cmd.Parameters.Add("@refno", SqlDbType.VarChar, 100).Value = Request.QueryString["refno"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["buyid"];
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
                cmd.Parameters.Add("@store", SqlDbType.Char).Value = Request.QueryString["store"].ToString();
                cmd.Parameters.Add("@fabric", SqlDbType.Char).Value = Request.QueryString["fab"].ToString();
                cmd.Parameters.Add("@prod", SqlDbType.Char).Value = Request.QueryString["prod"].ToString();
                sda.SelectCommand = cmd;
                BudgetReportGetDataSet ds = new BudgetReportGetDataSet();
                sda.Fill(ds, "BudgetReportGetDataSet");
                return ds;
          
        }
        public CompanyDetStatementDataSet GetData1()
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