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
    public partial class PieceWiseCosting : System.Web.UI.Page
    {

        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Budget/PieceWiseCosting.rdlc");
                ReportParameter rp1 = new ReportParameter("PrintName", Request.QueryString["PrintName"].ToString());
                CostingCompDetDataSet ds = GetData();
                CostingReportMainDataSet ds1 = GetData1();
                CostingPcsCMTDataSet ds2 = GetData2();
                CostingPcsTrimsDataset ds3 = GetData3();
                CostingPcsBuyChrgDataSet ds4 = GetData4();
                CostingPcsYarnProDataset ds5 = GetData5();
                CostingPcsExtraDataSet ds6 = GetData6();
                CostingPcsYarnFabricReqDetailDataSet ds7 = GetData7();
                CostingPcsTrimsDetailDataSet ds8 = GetData8();
                CostingPcsOrderDetailDataSet ds9 = GetData9();
                CostingPcsPanelDetailDataset ds10 = GetData10();
                CostingPcsBudgetCostFabYarnDetailDataset ds11 = GetData11();
                CostingPcsBudgetCostYarnDataset ds12 = GetData12();
                CostingPcsBudgetCostDyeingDataset ds13 = GetData13();
                CostingPcsBudgetCostPanelDataSet ds14 = GetData14();
                CostingPcsBudgetCostFabricDataSet ds15 = GetData15();
                CostingPcsBudgetCostFabricLossDataSet ds16 = GetData16();
                CostingPcsDeliveryDataSet ds17 = GetData17();
                CostingPcsConsumpDataSet ds18 = GetData18();
                CostingPcsQuoteLinkDataSet ds19 = GetData19();
                CostingPcsInlineOtherProcessDataSet ds20 = GetData20();
                CostingPcsBudgetCostYarnDyeingDataset ds21 = GetData21();
                ReportDataSource datasource = new ReportDataSource("CostingCompDetStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CostingReportMainStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CostingPcsCMTStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("CostingPcsTrimsStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("CostingPcsBuyChrgeStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("CostingPcsYarnProStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("CostingPcsExtraStatemant", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("CostingPcsYarnFabricReqDetailStatemant", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("CostingPcsTrimsDetailStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("CostingPcsOrderDetailStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("CostingPcsPanelDetailStatement", ds10.Tables[1]);
                ReportDataSource datasource11 = new ReportDataSource("CostingPcsBudgetCostFabYarnDetailStatement", ds11.Tables[1]);
                ReportDataSource datasource12 = new ReportDataSource("CostingPcsBudgetCostYarnStatement", ds12.Tables[1]);
                ReportDataSource datasource13 = new ReportDataSource("CostingPcsBudgetCostDyeingStatement", ds13.Tables[1]);
                ReportDataSource datasource14 = new ReportDataSource("CostingPcsBudgetCostPanelStatement", ds14.Tables[1]);
                ReportDataSource datasource15 = new ReportDataSource("CostingPcsBudgetCostFabricStatement", ds15.Tables[1]);
                ReportDataSource datasource16 = new ReportDataSource("CostingPcsBudgetCostFabricLossStatement", ds16.Tables[1]);
                ReportDataSource datasource17 = new ReportDataSource("CostingPcsDeliveryStatement", ds17.Tables[1]);
                ReportDataSource datasource18 = new ReportDataSource("CostingPcsDetConsmpStatement", ds18.Tables[1]);
                ReportDataSource datasource19 = new ReportDataSource("CostingPcsQuoteLinkStatement", ds19.Tables[1]);
                ReportDataSource datasource20 = new ReportDataSource("CostingPcsInlineOtherProcessStatement", ds20.Tables[1]);
                ReportDataSource datasource21 = new ReportDataSource("CostingPcsBudgetCostYarnDyeingStatement", ds21.Tables[1]);
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
                ReportViewer1.LocalReport.DataSources.Add(datasource16);
                ReportViewer1.LocalReport.DataSources.Add(datasource17);
                ReportViewer1.LocalReport.DataSources.Add(datasource18);
                ReportViewer1.LocalReport.DataSources.Add(datasource19);
                ReportViewer1.LocalReport.DataSources.Add(datasource20);
                ReportViewer1.LocalReport.DataSources.Add(datasource21);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
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
        public CostingReportMainDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudMainReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingReportMainDataSet ds = new CostingReportMainDataSet();
            sda.Fill(ds, "CostingReportMainDataSet");
            return ds;
        }
        public CostingPcsCMTDataSet GetData2()
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
        public CostingPcsTrimsDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudTrimPcsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsTrimsDataset ds = new CostingPcsTrimsDataset();
            sda.Fill(ds, "CostingPcsTrimsDataset");
            return ds;
        }
        public CostingPcsBuyChrgDataSet GetData4()
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
        public CostingPcsYarnProDataset GetData5()
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
        public CostingPcsExtraDataSet GetData6()
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
            CostingPcsExtraDataSet ds = new CostingPcsExtraDataSet();
            sda.Fill(ds, "CostingPcsExtraDataSet");
            return ds;
        }
        public CostingPcsYarnFabricReqDetailDataSet GetData7()
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
        public CostingPcsTrimsDetailDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostTrimReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsTrimsDetailDataSet ds = new CostingPcsTrimsDetailDataSet();
            sda.Fill(ds, "CostingPcsTrimsDetailDataSet");
            return ds;
        }
        public CostingPcsOrderDetailDataSet GetData9()
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
        public CostingPcsPanelDetailDataset GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostPanelReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsPanelDetailDataset ds = new CostingPcsPanelDetailDataset();
            sda.Fill(ds, "CostingPcsPanelDetailDataset");
            return ds;
        }
        public CostingPcsBudgetCostFabYarnDetailDataset GetData11()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostColorYarnFabReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostFabYarnDetailDataset ds = new CostingPcsBudgetCostFabYarnDetailDataset();
            sda.Fill(ds, "CostingPcsBudgetCostFabYarnDetailDataset");
            return ds;
        }
        public CostingPcsBudgetCostYarnDataset GetData12()
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
        public CostingPcsBudgetCostDyeingDataset GetData13()
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
        public CostingPcsBudgetCostPanelDataSet GetData14() 
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFabLossReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostPanelDataSet ds = new CostingPcsBudgetCostPanelDataSet();
            sda.Fill(ds, "CostingPcsBudgetCostPanelDataSet");
            return ds;
        }
        public CostingPcsBudgetCostFabricDataSet GetData15()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFabricReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 6000;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostFabricDataSet ds = new CostingPcsBudgetCostFabricDataSet();
            sda.Fill(ds, "CostingPcsBudgetCostFabricDataSet");
            return ds;
        }
        public CostingPcsBudgetCostFabricLossDataSet GetData16()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostFabLossReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostFabricLossDataSet ds = new CostingPcsBudgetCostFabricLossDataSet();
            sda.Fill(ds, "CostingPcsBudgetCostFabricLossDataSet");
            return ds;
        }
        public CostingPcsDeliveryDataSet GetData17()
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
        public CostingPcsConsumpDataSet GetData18()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostPcsDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsConsumpDataSet ds = new CostingPcsConsumpDataSet();
            sda.Fill(ds, "CostingPcsConsumpDataSet");
            return ds;
        }
        public CostingPcsQuoteLinkDataSet GetData19()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostQuotelinkDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@Stylerowid", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsQuoteLinkDataSet ds = new CostingPcsQuoteLinkDataSet();
            sda.Fill(ds, "CostingPcsQuoteLinkDataSet");
            return ds;
        }
        public CostingPcsInlineOtherProcessDataSet GetData20()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudOtherProcessPcsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsInlineOtherProcessDataSet ds = new CostingPcsInlineOtherProcessDataSet();
            sda.Fill(ds, "CostingPcsInlineOtherProcessDataSet");
            return ds;
        }
        public CostingPcsBudgetCostYarnDyeingDataset GetData21()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostYarnDyeingDetailsReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 600;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            sda.SelectCommand = cmd;
            CostingPcsBudgetCostYarnDyeingDataset ds = new CostingPcsBudgetCostYarnDyeingDataset();
            sda.Fill(ds, "CostingPcsBudgetCostYarnDyeingDataset");
            return ds;
        }
    }
}