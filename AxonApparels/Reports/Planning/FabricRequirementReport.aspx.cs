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
    public partial class FabricRequirementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/FabricRequirementReport.rdlc");

                ReportParameter rp1 = new ReportParameter("Yarn", Request.QueryString["Yarn"].ToString());
                ReportParameter rp2 = new ReportParameter("Compid", Request.QueryString["Compid"].ToString());
                PlanningFabricReqReportDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                PlanningFabricReqYarnDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("PlanningFabricReqReportStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanningFabricReqYarnStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 });
            }
        }
        public PlanningFabricReqReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricReq", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 200).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.VarChar, 200).Value = Request.QueryString["StyleID"].ToString();   
            sda.SelectCommand = cmd;
            PlanningFabricReqReportDataSet ds = new PlanningFabricReqReportDataSet();
            sda.Fill(ds, "FabricReqDataset");
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

        public PlanningFabricReqYarnDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricReqYarn", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 200).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.VarChar, 200).Value = Request.QueryString["StyleID"].ToString();   
            sda.SelectCommand = cmd;
            PlanningFabricReqYarnDataSet ds = new PlanningFabricReqYarnDataSet();
            sda.Fill(ds, "PlanningFabricReqYarnDataSet");
            return ds;
        }
    }
}