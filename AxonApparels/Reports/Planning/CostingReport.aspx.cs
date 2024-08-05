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
using AxonApparels.ReportInline.Company;

namespace AxonApparels.Reports.Planning
{
    public partial class CostingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/CostingReport.rdlc");
                FabCostingReportDataSet ds = GetData();
                AccCostingReportDataSet ds1 = GetData1();
                OutsideCostingReportDataSet ds2 = GetData2();
                CostingReportDataSet ds3 = GetData3();
                CostingReportMainDataSet ds4 = GetData4();
                FabDetCostingReportDataSet ds5 = GetData5();
                CostingCompDetDataSet ds6 = GetData6();
                ReportDataSource datasource = new ReportDataSource("FabCostingReportStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("AccCostingReportStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("OutsideCostingReportStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("CostingReportHeaderStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("CostingReportMainStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("FabDetCostingReportStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("CostingCompDetStatement", ds6.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public FabCostingReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumYarnFabReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            FabCostingReportDataSet ds = new FabCostingReportDataSet();
            sda.Fill(ds, "FabCostingReportDataSet");
            return ds;
        }
        public AccCostingReportDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumAccReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            AccCostingReportDataSet ds = new AccCostingReportDataSet();
            sda.Fill(ds, "AccCostingReportDataSet");
            return ds;
        }
        public OutsideCostingReportDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumOthersReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            OutsideCostingReportDataSet ds = new OutsideCostingReportDataSet();
            sda.Fill(ds, "OutsideCostingReportDataSet");
            return ds;
        }
        public CostingReportDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS RETURN";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            CostingReportDataSet ds = new CostingReportDataSet();
            sda.Fill(ds, "CostingReportDataSet");
            return ds;
        }
        public CostingReportMainDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudMainReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingReportMainDataSet ds = new CostingReportMainDataSet();
            sda.Fill(ds, "CostingReportMainDataSet");
            return ds;
        }
        public FabDetCostingReportDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudFabDetReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            FabDetCostingReportDataSet ds = new FabDetCostingReportDataSet();
            sda.Fill(ds, "FabDetCostingReportDataSet");
            return ds;
        }
        public CostingCompDetDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCompDetReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingCompDetDataSet ds = new CostingCompDetDataSet();
            sda.Fill(ds, "CostingCompDetDataSet");
            return ds;
        }
    }
}