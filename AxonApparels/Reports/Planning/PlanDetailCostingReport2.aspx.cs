using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AxonApparels.Reports.Planning
{
    public partial class PlanDetailCostingReport2 : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/PlanDetailCostingReport2.rdlc");
            ReportParameter rp1 = new ReportParameter("Type", Request.QueryString["Type"].ToString());
            ReportParameter rp2 = new ReportParameter("CmpID", Request.QueryString["Compid"].ToString());
            PlanDetailCostDataSet ds = GetData();
            CompanyDetStatementDataSet ds1 = GetData1();
            ReportDataSource datasource = new ReportDataSource("PlanDetailCostingStatement", ds.Tables[1]);
            ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource);
            ReportViewer1.LocalReport.DataSources.Add(datasource1);
            ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2});
        }
        public PlanDetailCostDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannDetailCostingF2Statement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            if (Convert.ToInt32(Request.QueryString["Compid"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            }
            if (Request.QueryString["OrdNo"] != "--Select OrderNo--")
            {
                cmd.Parameters.Add("@Orderno", SqlDbType.VarChar, 50).Value = Request.QueryString["OrdNo"].ToString();
            }           
            sda.SelectCommand = cmd;
            PlanDetailCostDataSet ds = new PlanDetailCostDataSet();
            sda.Fill(ds, "PlanDetailCostDataSet");
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