using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.OrderProcessing
{
    public partial class QuotationMainInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/OrderProcessing/QuotationMainInlineReport.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int CompanyId = Int32.Parse(Request.QueryString["CompId"]);
                string img = CompanyDetails.GetCompanyImgpath(CompanyId);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                GetQuoteReportMasdetDataSet ds = GetData();
                CompanyDetStatementDataSet ds2 = GetData2();
                QuoteRepFabricCostDataSet ds3 = GetData3();
                QuoteRepComponentDetDataSet ds4 = GetData4();
                QouteRepProdDetDataSet ds5 = GetData5();
                QuoteRepBomDetDataSet ds6 = GetData6();
                QuoteRepCommercialDetDataSet ds7 = GetData7();
                QuoteRepFabricDetDataSet ds8 = GetData8();

                ReportDataSource datasource = new ReportDataSource("GetQuoteReportMasdetStatement", ds.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("LoadCompanyDetStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("QuoteRepFabricCostStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("QuoteRepComponentDetStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("QouteRepProdDetStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("QuoteRepBomDetStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("QuoteRepCommercialDetStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("QuoteRepFabricDetStatement", ds8.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.DataSources.Add(datasource7);
                ReportViewer1.LocalReport.DataSources.Add(datasource8);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public GetQuoteReportMasdetDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetQuoteRepMasdet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            GetQuoteReportMasdetDataSet ds = new GetQuoteReportMasdetDataSet();
            sda.Fill(ds, "GetQuoteReportMasdetDataSet");
            return ds;
        }
        public CompanyDetStatementDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompId"].ToString();
            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }
        public QuoteRepFabricCostDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetQuoteRepFabricCost", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QuoteRepFabricCostDataSet ds = new QuoteRepFabricCostDataSet();
            sda.Fill(ds, "QuoteRepFabricCostDataSet");
            return ds;
        }
        public QuoteRepComponentDetDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuoteRepComponentDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QuoteRepComponentDetDataSet ds = new QuoteRepComponentDetDataSet();
            sda.Fill(ds, "QuoteRepComponentDetDataSet");
            return ds;
        }
        public QouteRepProdDetDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuoteRepProdDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QouteRepProdDetDataSet ds = new QouteRepProdDetDataSet();
            sda.Fill(ds, "QouteRepProdDetDataSet");
            return ds;
        }
        public QuoteRepBomDetDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("proc_Apparel_QuoteRepBomDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QuoteRepBomDetDataSet ds = new QuoteRepBomDetDataSet();
            sda.Fill(ds, "QuoteRepBomDetDataSet");
            return ds;
        }
        public QuoteRepCommercialDetDataSet GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("proc_Apparel_QuoteRepCommercialDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QuoteRepCommercialDetDataSet ds = new QuoteRepCommercialDetDataSet();
            sda.Fill(ds, "QuoteRepCommercialDetDataSet");
            return ds;
        }
        public QuoteRepFabricDetDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_QuoteRepFabricDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@QuoteId", SqlDbType.Int).Value = Request.QueryString["QuoteId"].ToString();
            sda.SelectCommand = cmd;
            QuoteRepFabricDetDataSet ds = new QuoteRepFabricDetDataSet();
            sda.Fill(ds, "QuoteRepFabricDetDataSet");
            return ds;
        }
    }
}