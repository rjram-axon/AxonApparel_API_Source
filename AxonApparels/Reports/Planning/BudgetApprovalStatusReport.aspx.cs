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
    public partial class BudgetApprovalReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/BudgetApprovalStatusReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Status", Request.QueryString["Status"].ToString());
                BudgetApprovalStatusAllDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("BudgetApprovalStatusAllStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public BudgetApprovalStatusAllDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;
            con =new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudgetApprovalStatus", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandTimeout = 300;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@compid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["styleid"];
            cmd.Parameters.Add("@jobordno", SqlDbType.VarChar, 50).Value = Request.QueryString["jobno"].ToString();
            cmd.Parameters.Add("@ordno", SqlDbType.VarChar, 100).Value = Request.QueryString["ordno"].ToString();
            cmd.Parameters.Add("@refno", SqlDbType.VarChar, 100).Value = Request.QueryString["refno"].ToString();
            cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["buyid"];
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@status", SqlDbType.Char).Value = Request.QueryString["Status"].ToString();
            sda.SelectCommand = cmd;
            BudgetApprovalStatusAllDataSet ds = new BudgetApprovalStatusAllDataSet();
            sda.Fill(ds, "BudgetApprovalStatusAllDataSet");
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