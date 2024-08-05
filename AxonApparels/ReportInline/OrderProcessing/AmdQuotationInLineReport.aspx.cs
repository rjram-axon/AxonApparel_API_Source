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

namespace AxonApparels.ReportInline.OrderProcessing
{
    public partial class AmdQuotationInLineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/OrderProcessing/AmdQuotationInLine.rdlc");
                ReportParameter rp1 = new ReportParameter("RQuoteNo", Request.QueryString["RQuoteNo"].ToString());
                MarkQuoteMasDataSetAmd ds = GetData();
                MarkQuoteFabricDataSetAmd ds1 = GetData1();
                MarkQuoteYarnDataSetAmd ds2 = GetYarnDetail();
                MarkQuoteProcessDataSetAmd ds3 = GetProcessDetail();
                MarkQuoteCMTDataSetAmd ds4 = GetCMTProcessDetail();
                MarkQuoteProcessMatrixDataSetAmd ds5 = GetMatrixProcessDetail();
                MarkQuoteFabricGSMDataSetAmd ds6 = GetFabricHeaderGSMDetail();
                MarkBuyerChargesDataSetAmd ds7 = GetBuyerChargesData();
                MarkQuoteTrimsDataSetAmd ds8 = GetTrimsDetailData();
                MarkQuoteQcValueDataSetAmd ds9 = GetQcDetailData();


                ReportDataSource datasource = new ReportDataSource("MarkQuoteMasStatementAmd", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("MarkQuoteFabricStatementAmd", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("MarkQuoteYarnStatementAmd", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("MarkQuoteProcessStatementAmd", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("MarkQuoteCMTStatementAmd", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("MarkQuoteProcessMatrixStatementAmd", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("MarkQuoteFabricGSMStatementAmd", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("MarkBuyerChargesStatementAmd", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("MarkQuoteTrimsDetailStatementAmd", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("MarkQuoteQcValueStatementAmd", ds9.Tables[1]);

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
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }

        public MarkQuoteMasDataSetAmd GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMarkQuotationMasAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteMasDataSetAmd ds = new MarkQuoteMasDataSetAmd();
            sda.Fill(ds, "MarkQuoteMasDataSetAmd");
            return ds;
        }

        public MarkQuoteTrimsDataSetAmd GetTrimsDetailData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_MarkQuoteTrimsDetailAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteTrimsDataSetAmd ds = new MarkQuoteTrimsDataSetAmd();
            sda.Fill(ds, "MarkQuoteTrimsDataSetAmd");
            return ds;
        }

        public MarkBuyerChargesDataSetAmd GetBuyerChargesData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_MarkBuyerChargesReportAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@Recid", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkBuyerChargesDataSetAmd ds = new MarkBuyerChargesDataSetAmd();
            sda.Fill(ds, "MarkBuyerChargesDataSetAmd");
            return ds;
        }

        public MarkQuoteYarnDataSetAmd GetYarnDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationYarnPercentageAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@Recid", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteYarnDataSetAmd ds = new MarkQuoteYarnDataSetAmd();
            sda.Fill(ds, "MarkQuoteYarnDataSetAmd");
            return ds;
        }

        public MarkQuoteProcessDataSetAmd GetProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationProcessPercentageAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteProcessDataSetAmd ds = new MarkQuoteProcessDataSetAmd();
            sda.Fill(ds, "MarkQuoteProcessDataSetAmd");
            return ds;
        }

        public MarkQuoteCMTDataSetAmd GetCMTProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationCMTPercentageAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteCMTDataSetAmd ds = new MarkQuoteCMTDataSetAmd();
            sda.Fill(ds, "MarkQuoteCMTDataSetAmd");
            return ds;
        }

        public MarkQuoteFabricGSMDataSetAmd GetFabricHeaderGSMDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationHeaderFabricDetailAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteFabricGSMDataSetAmd ds = new MarkQuoteFabricGSMDataSetAmd();
            sda.Fill(ds, "MarkQuoteFabricGSMDataSetAmd");
            return ds;
        }

        public MarkQuoteProcessMatrixDataSetAmd GetMatrixProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationProcessMatrixAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteProcessMatrixDataSetAmd ds = new MarkQuoteProcessMatrixDataSetAmd();
            sda.Fill(ds, "MarkQuoteProcessMatrixDataSetAmd");
            return ds;
        }

        public MarkQuoteFabricDataSetAmd GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMarkQuotationFabricAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteFabricDataSetAmd ds = new MarkQuoteFabricDataSetAmd();
            sda.Fill(ds, "MarkQuoteFabricDataSetAmd");
            return ds;
        }
        public MarkQuoteQcValueDataSetAmd GetQcDetailData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostQuoteQcDetAmend", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@RecId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteQcValueDataSetAmd ds = new MarkQuoteQcValueDataSetAmd();
            sda.Fill(ds, "MarkQuoteQcValueDataSetAmd");
            return ds;
        }

    }
}