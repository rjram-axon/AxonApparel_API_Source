using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AxonApparels.ReportInline.Company;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;
using System.Configuration;


namespace AxonApparels.ReportInline.BudgetApproval
{
    public partial class BudgetApprovalInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            { 
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/BudgetApproval/BudgetApprovalInlineReport.rdlc");
                BudAppMainlistInlineDataSet ds = GetData();
                BudAppShipMainlistInlineDataSet ds1 = GetData1();
                ConsBudAppInlineDataSet ds2 = GetData2();
                BudAppSumYarnFabricInlineDataSet ds3 = GetData3();
                BudAppSumAccInlineDataSet ds4 = GetData4();
                BudAppSumProcInlineDataSet ds5 = GetData5();
                BudAppSumProductionDataSet ds6 = GetData6();  
                BudAppConsCommInlineDataSet ds7 = GetData7();
                ConsBudAppCostInlineDataSet ds8 = GetData8();
                BudAppConDetInlineDataSet ds9 = GetData9();
                BudAppgetStyleSizerangeDataSet ds10 = GetData10();
                ReportDataSource datasource = new ReportDataSource("BudAppMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("BudAppShipMainlistInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ConsBudAppInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("BudAppSumYarnFabricInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("BudAppSumAccInlineStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("BudAppSumProcInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("BudAppSumProductionstatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("BudAppConsCommInlineStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("ConsBudAppCostInlineStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("BudAppConDetInlineStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("BudAppgetStyleSizerangeStatement", ds10.Tables[1]);
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
        public BudAppMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppMainlistInlineDataSet ds = new BudAppMainlistInlineDataSet();
            sda.Fill(ds, "BudAppMainlistInlineDataSet");


            if (ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    if ((ds.Tables[1].Rows[i][34].ToString()) != "")
                    {
                        string path = new Uri(Server.MapPath((ds.Tables[1].Rows[i][34].ToString()))).AbsoluteUri;
                        ds.Tables[1].Rows[i][34] = path;
                    }
                }
            }

            return ds;
        }
        public BudAppShipMainlistInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppShipMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppShipMainlistInlineDataSet ds = new BudAppShipMainlistInlineDataSet();
            sda.Fill(ds, "BudAppShipMainlistInlineDataSet");
            return ds;
        }
        public ConsBudAppInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ConsBudAppInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            ConsBudAppInlineDataSet ds = new ConsBudAppInlineDataSet();
            sda.Fill(ds, "ConsBudAppInlineDataSet");
            return ds;
        }
        public BudAppSumYarnFabricInlineDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppSumYarnFabInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppSumYarnFabricInlineDataSet ds = new BudAppSumYarnFabricInlineDataSet();
            sda.Fill(ds, "BudAppSumYarnFabricInlineDataSet");
            return ds;
        }
        public BudAppSumAccInlineDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppSumAccInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppSumAccInlineDataSet ds = new BudAppSumAccInlineDataSet();
            sda.Fill(ds, "BudAppSumAccInlineDataSet");
            return ds;
        }
        public BudAppSumProcInlineDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppSumProcInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppSumProcInlineDataSet ds = new BudAppSumProcInlineDataSet();
            sda.Fill(ds, "BudAppSumProcInlineDataSet");
            return ds;
        }
        public BudAppSumProductionDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppSumProdInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppSumProductionDataSet ds = new BudAppSumProductionDataSet();
            sda.Fill(ds, "BudAppSumProductionDataSet");
            return ds;
        }
        public BudAppConsCommInlineDataSet GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppConsCommInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppConsCommInlineDataSet ds = new BudAppConsCommInlineDataSet();
            sda.Fill(ds, "BudAppConsCommInlineDataSet");
            return ds;
        }
        public ConsBudAppCostInlineDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ConsBudAppCostInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            ConsBudAppCostInlineDataSet ds = new ConsBudAppCostInlineDataSet();
            sda.Fill(ds, "ConsBudAppCostInlineDataSet");
            return ds;
        }

        public BudAppConDetInlineDataSet GetData9()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudAppConDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppConDetInlineDataSet ds = new BudAppConDetInlineDataSet();
            sda.Fill(ds, "BudAppConDetInlineDataSet");
            return ds;
        }

        public BudAppgetStyleSizerangeDataSet GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BudgetStyleSizerange", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            BudAppgetStyleSizerangeDataSet ds = new BudAppgetStyleSizerangeDataSet();
            sda.Fill(ds, "BudAppgetStyleSizerangeDataSet");
            return ds;
        }
    }
}