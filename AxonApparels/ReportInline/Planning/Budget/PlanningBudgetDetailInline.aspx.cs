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
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Planning.Budget
{
    public partial class PlanningBudgetDetailInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Budget/PlanningBudgetDetailInlineReport.rdlc");
                PlanningBudgetMainInlineDataset ds = GetData();
                PlanningBudgetMainShipInlineDataset ds1 = GetData1();
                PlanningBudgetConsInlineDataset ds2 = GetData2();
                PlanningBudgetDetFabricYarnInlineDataset ds3 = GetData3();
                PlanningBudgetDetProcessInlineDataset ds4 = GetData4();
                PlanningBudgetDetProdInlineDataset ds5 = GetData5();
                PlanningBudgetDetAccInlineDataset ds6 = GetData6();
                PlanningBudgetDetCommInlineDataset ds7 = GetData7();
                ReportDataSource datasource = new ReportDataSource("PlanningBudgetMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningBudgetMainShipInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanningBudgetConsInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanningBudgetDetFabricYarnInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PlanningBudgetDetProcessInlineStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PlanningBudgetDetProdInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("PlanningBudgetDetAccInlineStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("PlanningBudgetDetCommInlineStatement", ds7.Tables[1]);
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
                ReportViewer1.LocalReport.DataSources.Add(datasource7);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public PlanningBudgetMainInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetMainInlineDataset ds = new PlanningBudgetMainInlineDataset();
            sda.Fill(ds, "PlanningBudgetMainInlineDataset");
            return ds;
        }
        public PlanningBudgetMainShipInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudShipMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetMainShipInlineDataset ds = new PlanningBudgetMainShipInlineDataset();
            sda.Fill(ds, "PlanningBudgetMainShipInlineDataset");
            return ds;
        }
        public PlanningBudgetConsInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsBudInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetConsInlineDataset ds = new PlanningBudgetConsInlineDataset();
            sda.Fill(ds, "PlanningBudgetConsInlineDataset");
            return ds;
        }
        public PlanningBudgetDetFabricYarnInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConFabYarnBudInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetDetFabricYarnInlineDataset ds = new PlanningBudgetDetFabricYarnInlineDataset();
            sda.Fill(ds, "PlanningBudgetDetFabricYarnInlineDataset");
            return ds;
        }
        public PlanningBudgetDetProcessInlineDataset GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConProcessBudInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetDetProcessInlineDataset ds = new PlanningBudgetDetProcessInlineDataset();
            sda.Fill(ds, "PlanningBudgetDetProcessInlineDataset");
            return ds;
        }
        public PlanningBudgetDetProdInlineDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConProdBudInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetDetProdInlineDataset ds = new PlanningBudgetDetProdInlineDataset();
            sda.Fill(ds, "PlanningBudgetDetProdInlineDataset");
            return ds;
        }
        public PlanningBudgetDetAccInlineDataset GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConAccBudInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetDetAccInlineDataset ds = new PlanningBudgetDetAccInlineDataset();
            sda.Fill(ds, "PlanningBudgetDetAccInlineDataset");
            return ds;
        }
        public PlanningBudgetDetCommInlineDataset GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsCommInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetDetCommInlineDataset ds = new PlanningBudgetDetCommInlineDataset();
            sda.Fill(ds, "PlanningBudgetDetCommInlineDataset");
            return ds;
        }
    }
}