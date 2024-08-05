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
    public partial class PlanningBudgetSummaryInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Budget/PlanningBudgetSummaryInlineReport.rdlc");
                PlanningBudSummaryMainInlineDataSet ds = GetData();
                PlanningBudSummaryShipMainInlineDataset ds1 = GetData1();
                PlanningBudgetSumConsInlineDataset ds2 = GetData2();
                PlanningBudgetSumFabInlineDataset ds3 = GetData3();
                PlanningBudgetSumAccInlineDataset ds4 = GetData4();
                PlanningBudgetSumProcInlineDataset ds5 = GetData5();
                PlanningBudgetSumProdInlineDataset ds6 = GetData6();
                PlanningBudgetSumCommInlineDataSet ds7 = GetData7();
                PlanningBudSumCostDataSet ds8 = GetData8();
                PlanningConsumDetInlineDataset ds9 = GetData9();
                BudgetStyleSizerangeDataSet ds10 = GetData10();
              
                ReportDataSource datasource = new ReportDataSource("PlanningBudSummaryMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningBudSummaryShipMainInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanningBudgetSumConsInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanningBudgetSumFabInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PlanningBudgetSumAccInlineStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PlanningBudgetSumProcInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("PlanningBudgetSumProdInlineStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("PlanningBudgetSumCommInlineStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("PlanningBudSumCostStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("PlanningConsumDetBudgetInlineStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("BudgetStyleSizerangeStatement", ds10.Tables[1]);
              
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
                ReportViewer1.LocalReport.DataSources.Add(datasource8);
                ReportViewer1.LocalReport.DataSources.Add(datasource9);
                ReportViewer1.LocalReport.DataSources.Add(datasource10);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public PlanningBudSummaryMainInlineDataSet GetData()
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
            PlanningBudSummaryMainInlineDataSet ds = new PlanningBudSummaryMainInlineDataSet();
            sda.Fill(ds, "PlanningBudSummaryMainInlineDataSet");


            if (ds.Tables[1].Rows.Count > 0)
            {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        if ((ds.Tables[1].Rows[i][33].ToString()) != "")
                        {
                            string path = new Uri(Server.MapPath((ds.Tables[1].Rows[i][33].ToString()))).AbsoluteUri;
                            ds.Tables[1].Rows[i][33] = path;
                        }
                    }
            }

            return ds;
        }
        public PlanningBudSummaryShipMainInlineDataset GetData1()
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
            PlanningBudSummaryShipMainInlineDataset ds = new PlanningBudSummaryShipMainInlineDataset();
            sda.Fill(ds, "PlanningBudSummaryShipMainInlineDataset");
            return ds;
        }
        public PlanningBudgetSumConsInlineDataset GetData2()
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
            PlanningBudgetSumConsInlineDataset ds = new PlanningBudgetSumConsInlineDataset();
            sda.Fill(ds, "PlanningBudgetSumConsInlineDataset");
            return ds;
        }
        public PlanningBudgetSumFabInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumYarnFabInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetSumFabInlineDataset ds = new PlanningBudgetSumFabInlineDataset();
            sda.Fill(ds, "PlanningBudgetSumFabInlineDataset");
            return ds;
        }
        public PlanningBudgetSumAccInlineDataset GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumAccInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetSumAccInlineDataset ds = new PlanningBudgetSumAccInlineDataset();
            sda.Fill(ds, "PlanningBudgetSumAccInlineDataset");
            return ds;
        }
        public PlanningBudgetSumProcInlineDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumProcInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetSumProcInlineDataset ds = new PlanningBudgetSumProcInlineDataset();
            sda.Fill(ds, "PlanningBudgetSumProcInlineDataset");
            return ds;
        }
        public PlanningBudgetSumProdInlineDataset GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudSumProdInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudgetSumProdInlineDataset ds = new PlanningBudgetSumProdInlineDataset();
            sda.Fill(ds, "PlanningBudgetSumProdInlineDataset");
            return ds;
        }
        public PlanningBudgetSumCommInlineDataSet GetData7()
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
            PlanningBudgetSumCommInlineDataSet ds = new PlanningBudgetSumCommInlineDataSet();
            sda.Fill(ds, "PlanningBudgetSumCommInlineDataSet");
            return ds;
        }
        public PlanningBudSumCostDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsBudCostInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningBudSumCostDataSet ds = new PlanningBudSumCostDataSet();
            sda.Fill(ds, "PlanningBudSumCostDataSet");
            return ds;
        }

        public PlanningConsumDetInlineDataset GetData9()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningConsumDetInlineDataset ds = new PlanningConsumDetInlineDataset();
            sda.Fill(ds, "PlanningConsumDetInlineDataset");
            return ds;
        }

        public BudgetStyleSizerangeDataSet GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBudgetStyleSizerange", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudgetStyleSizerangeDataSet ds = new BudgetStyleSizerangeDataSet();
            sda.Fill(ds, "BudgetStyleSizerangeDataSet");
            return ds;
        }

      

    }


   
}