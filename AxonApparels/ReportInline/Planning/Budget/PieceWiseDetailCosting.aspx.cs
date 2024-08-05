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

namespace AxonApparels.ReportInline.Planning.Budget
{
    public partial class PieceWiseDetailCosting : System.Web.UI.Page
    {

        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Budget/PieceWiseDetailCosting.rdlc");
                ReportParameter rp1 = new ReportParameter("Type", Request.QueryString["Type"].ToString());
                CostingCompDetDataSet ds = GetData();
                CostingDetMainDataSet  ds1 = GetData1();
                CostingDetSizeDataSet  ds2 = GetData2();
                CostingPcsExtraDataSet  ds3 = GetData3();
                CostingPcsYarnFabricReqDetailDataSet  ds4 = GetData4();
                CostingPcsBudgetCostYarnDataset  ds5 = GetData5();
                CostingPcsBudgetCostFabricDataSet  ds6 = GetData6();
                CostingPcsBudgetCostDyeingDataset  ds7 = GetData7();
                CostingPcsOrderDetailDataSet  ds8 = GetData8();
                CostingDetFITDataset ds9 = GetData9();
                CostingDetTrimAllDetDataSet ds10 = GetData10();
                CostingPcsPanelDiaDetailDataset ds11 = GetData11();
                CostingPcsDeliveryDataSet ds12 = GetData12();
                CostingPcsYarnProDataset ds13 = GetData13();
                CostingPcsBuyChrgDataSet ds14 = GetData14();
                CostingPcsCMTDataSet ds15 = GetData15();
                //CostingPcsBudgetCostFabricLossDataSet ds16 = GetData16();
                ReportDataSource datasource = new ReportDataSource("CompanyDetStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CostingDetMainStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CostingDetSizeStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("CostingDetCompStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("CostingPcsYarnFabricReqDetailStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("CostingDetPcsBudgetCostYarnStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("CostingDetPcsBudgetCostFabricStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("CostingDetPcsBudgetCostDyeingStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("CostingDetPcsOrderDetailStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("CostingDetFITStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("CostingDetTrimAllDetStatement", ds10.Tables[1]);
                ReportDataSource datasource11 = new ReportDataSource("CostingPcsPanelDetailStatement", ds11.Tables[1]);
                ReportDataSource datasource12 = new ReportDataSource("CostingPcsDetailDeliStatement", ds12.Tables[1]);
                ReportDataSource datasource13 = new ReportDataSource("CostingPcsYarnProcessStatement", ds13.Tables[1]);
                ReportDataSource datasource14 = new ReportDataSource("CostingPcsBuyerDetailsStatement", ds14.Tables[1]);
                ReportDataSource datasource15 = new ReportDataSource("CostingPcsClothCMTStatement", ds15.Tables[1]);
                //ReportDataSource datasource16 = new ReportDataSource("CostingPcsBudgetCostFabricLossStatement", ds16.Tables[1]);
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
                ReportViewer1.LocalReport.DataSources.Add(datasource11);
                ReportViewer1.LocalReport.DataSources.Add(datasource12);
                ReportViewer1.LocalReport.DataSources.Add(datasource13);
                ReportViewer1.LocalReport.DataSources.Add(datasource14);
                ReportViewer1.LocalReport.DataSources.Add(datasource15);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] {rp1});
                //ReportViewer1.LocalReport.DataSources.Add(datasource16);

            }
        }
        public CostingCompDetDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCompDetReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingCompDetDataSet ds = new CostingCompDetDataSet();
            sda.Fill(ds, "CostingCompDetDataSet");
            return ds;
        }
        public CostingDetMainDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostMainReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            cmd.Parameters.Add("@Type", SqlDbType.NVarChar).Value = Request.QueryString["Type"].ToString();
            sda.SelectCommand = cmd;
            CostingDetMainDataSet ds = new CostingDetMainDataSet();
            sda.Fill(ds, "CostingDetMainDataSet");
            return ds;
        }
        public CostingDetSizeDataSet  GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostSizeMainReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingDetSizeDataSet ds = new CostingDetSizeDataSet();
            sda.Fill(ds, "CostingDetSizeDataSet");
            return ds;
        }
        public CostingPcsExtraDataSet  GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostCompReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsExtraDataSet  ds = new CostingPcsExtraDataSet();
            sda.Fill(ds, "CostingPcsExtraDataSet");
            return ds;
        }
        public CostingPcsYarnFabricReqDetailDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFabYarnReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsYarnFabricReqDetailDataSet ds = new CostingPcsYarnFabricReqDetailDataSet();
            sda.Fill(ds, "CostingPcsYarnFabricReqDetailDataSet");
            return ds;
        }
        public CostingPcsBudgetCostYarnDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostYarnReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostYarnDataset ds = new CostingPcsBudgetCostYarnDataset();
            sda.Fill(ds, "CostingPcsBudgetCostYarnDataset");
            return ds;
        }
        public CostingPcsBudgetCostFabricDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFabricReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostFabricDataSet ds = new CostingPcsBudgetCostFabricDataSet();
            sda.Fill(ds, "CostingPcsBudgetCostFabricDataSet");
            return ds;
        }
        public CostingPcsBudgetCostDyeingDataset GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostDyeingDetailsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostDyeingDataset ds = new CostingPcsBudgetCostDyeingDataset();
            sda.Fill(ds, "CostingPcsBudgetCostDyeingDataset");
            return ds;
        }
        public CostingPcsOrderDetailDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostOrderDetailsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsOrderDetailDataSet ds = new CostingPcsOrderDetailDataSet();
            sda.Fill(ds, "CostingPcsOrderDetailDataSet");
            return ds;
        }
        public CostingDetFITDataset GetData9()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFitDetailsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            //if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            //{
            //    cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            //}
            sda.SelectCommand = cmd;
            CostingDetFITDataset ds = new CostingDetFITDataset();
            sda.Fill(ds, "CostingDetFITDataset");
            return ds;
        }
        public CostingDetTrimAllDetDataSet GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostTrimAllDetReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingDetTrimAllDetDataSet ds = new CostingDetTrimAllDetDataSet();
            sda.Fill(ds, "CostingDetTrimAllDetDataSet");
            return ds;
        }
        public CostingPcsPanelDiaDetailDataset GetData11()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostDetailPanelReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsPanelDiaDetailDataset ds = new CostingPcsPanelDiaDetailDataset();
            sda.Fill(ds, "CostingPcsPanelDiaDetailDataset");
            return ds;
        }
        public CostingPcsDeliveryDataSet GetData12()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostDeliDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsDeliveryDataSet ds = new CostingPcsDeliveryDataSet();
            sda.Fill(ds, "CostingPcsDeliveryDataSet");
            return ds;
        }
        public CostingPcsYarnProDataset GetData13()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudYarnProcessPcsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsYarnProDataset ds = new CostingPcsYarnProDataset();
            sda.Fill(ds, "CostingPcsYarnProDataset");
            return ds;
        }
        public CostingPcsBuyChrgDataSet GetData14()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudBuyChrgePcsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBuyChrgDataSet ds = new CostingPcsBuyChrgDataSet();
            sda.Fill(ds, "CostingPcsBuyChrgDataSet");
            return ds;
        }
        public CostingPcsCMTDataSet GetData15()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCMTPcsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsCMTDataSet ds = new CostingPcsCMTDataSet();
            sda.Fill(ds, "CostingPcsCMTDataSet");
            return ds;
        }
    }
}