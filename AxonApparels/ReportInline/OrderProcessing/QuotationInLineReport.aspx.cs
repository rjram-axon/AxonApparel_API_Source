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
    public partial class QuotationInLineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/OrderProcessing/QuotationInLine.rdlc");

                MarkQuoteMasDataSet ds = GetData();
                MarkQuoteFabricDataSet ds1 = GetData1();
                MarkQuoteYarnDataSet ds2 = GetYarnDetail();
                MarkQuoteProcessDataSet ds3 = GetProcessDetail();
                MarkQuoteCMTDataSet ds4 = GetCMTProcessDetail();
                MarkQuoteProcessMatrixDataSet ds5 = GetMatrixProcessDetail();
                MarkQuoteFabricGSMDataSet ds6 = GetFabricHeaderGSMDetail();
                MarkBuyerChargesDataSet ds7 = GetBuyerChargesData();
                MarkQuoteTrimsDataSet ds8 = GetTrimsDetailData();
                MarkQuoteQcValueDataSet ds9 = GetQcDetailData();

                
                ReportDataSource datasource = new ReportDataSource("MarkQuoteMasStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("MarkQuoteFabricStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("MarkQuoteYarnStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("MarkQuoteProcessStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("MarkQuoteCMTStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("MarkQuoteProcessMatrixStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("MarkQuoteFabricGSMStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("MarkBuyerChargesStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("MarkQuoteTrimsDetailStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("MarkQuoteQcValueStatement", ds9.Tables[1]);

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
            }
        }

        public MarkQuoteMasDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMarkQuotationMas", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteMasDataSet ds = new MarkQuoteMasDataSet();
            sda.Fill(ds, "MarkQuoteMasDataSet");
            return ds;
        }

        public MarkQuoteTrimsDataSet GetTrimsDetailData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_MarkQuoteTrimsDetail", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteTrimsDataSet ds = new MarkQuoteTrimsDataSet();
            sda.Fill(ds, "MarkQuoteTrimsDataSet");
            return ds;
        }

        public MarkBuyerChargesDataSet GetBuyerChargesData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_MarkBuyerChargesReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkBuyerChargesDataSet ds = new MarkBuyerChargesDataSet();
            sda.Fill(ds, "MarkBuyerChargesDataSet");
            return ds;
        }

        public MarkQuoteYarnDataSet GetYarnDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationYarnPercentage", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteYarnDataSet ds = new MarkQuoteYarnDataSet();
            sda.Fill(ds, "MarkQuoteYarnDataSet");
            return ds;
        }

        public MarkQuoteProcessDataSet GetProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationProcessPercentage", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteProcessDataSet ds = new MarkQuoteProcessDataSet();
            sda.Fill(ds, "MarkQuoteProcessDataSet");
            return ds;
        }

        public MarkQuoteCMTDataSet GetCMTProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationCMTPercentage", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteCMTDataSet ds = new MarkQuoteCMTDataSet();
            sda.Fill(ds, "MarkQuoteCMTDataSet");
            return ds;
        }

        public MarkQuoteFabricGSMDataSet GetFabricHeaderGSMDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationHeaderFabricDetail", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteFabricGSMDataSet ds = new MarkQuoteFabricGSMDataSet();
            sda.Fill(ds, "MarkQuoteFabricGSMDataSet");
            return ds;
        }

        public MarkQuoteProcessMatrixDataSet GetMatrixProcessDetail()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuotationProcessMatrix", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteProcessMatrixDataSet ds = new MarkQuoteProcessMatrixDataSet();
            sda.Fill(ds, "MarkQuoteProcessMatrixDataSet");
            return ds;
        }

        public MarkQuoteFabricDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMarkQuotationFabric", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteFabricDataSet ds = new MarkQuoteFabricDataSet();
            sda.Fill(ds, "MarkQuoteFabricDataSet");
            return ds;
        }
        public MarkQuoteQcValueDataSet GetQcDetailData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningBudCostQuoteQcDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["QuoteId"]) > 0 && Request.QueryString["QuoteId"] != null)
            {
                cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            }
            sda.SelectCommand = cmd;
            MarkQuoteQcValueDataSet ds = new MarkQuoteQcValueDataSet();
            sda.Fill(ds, "MarkQuoteQcValueDataSet");
            return ds;
        }
    }
}