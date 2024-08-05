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

namespace AxonApparels.ReportInline.Process.GeneralProcessReceipt
{
    public partial class GeneralProcessReceiptInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/GeneralProcessReceipt/GeneralProcessReceiptInlineReport.rdlc");
                ReportParameter rp1 = new ReportParameter("RetLossdet", Request.QueryString["RetLossdet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Lotdet", Request.QueryString["Lotdet"].ToString());
                ReportParameter rp4 = new ReportParameter("Procord", Request.QueryString["Procord"].ToString());
                ReportParameter rp5 = new ReportParameter("POdet", Request.QueryString["POdet"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp7 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp8 = new ReportParameter("ImagePath", img);
                ReportParameter rp9 = new ReportParameter("Process", Request.QueryString["Process"].ToString());
                GeneralProcessReceiptMainInlineDataSet ds = GetData();
                GeneralProcessReceiptDetailInlineDataSet ds1 = GetData1();
                GeneralProcessReceiptProcOrdInlineDataSet ds2 = GetData2();
                GeneralProcessReceiptGrnInlineDataSet ds3 = GetData3();
                GeneralProcessReceiptHeaderDataSet ds4 = GetData4();
                ReportDataSource datasource = new ReportDataSource("GeneralProcessReceiptMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("GeneralProcessReceiptDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("GeneralProcessReceiptProcOrdInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("GeneralProcessReceiptGrnInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("GeneralProcessReceiptHeaderStatement", ds4.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9 });

            }
        }

        public GeneralProcessReceiptMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReceiptMainInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessReceiptMainInlineDataSet ds = new GeneralProcessReceiptMainInlineDataSet();
            sda.Fill(ds, "GeneralProcessReceiptMainInlineDataSet");
            return ds;
        }

        public GeneralProcessReceiptDetailInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReceiptDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessReceiptDetailInlineDataSet ds = new GeneralProcessReceiptDetailInlineDataSet();
            sda.Fill(ds, "GeneralProcessReceiptDetailInlineDataSet");
            return ds;
        }
        public GeneralProcessReceiptProcOrdInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReceiptProcOrdDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessReceiptProcOrdInlineDataSet ds = new GeneralProcessReceiptProcOrdInlineDataSet();
            sda.Fill(ds, "GeneralProcessReceiptProcOrdInlineDataSet");
            return ds;
        }

        public GeneralProcessReceiptGrnInlineDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReceiptGRNDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessReceiptGrnInlineDataSet ds = new GeneralProcessReceiptGrnInlineDataSet();
            sda.Fill(ds, "GeneralProcessReceiptGrnInlineDataSet");
            return ds;
        }
        public GeneralProcessReceiptHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS RECEIPT";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            GeneralProcessReceiptHeaderDataSet ds = new GeneralProcessReceiptHeaderDataSet();
            sda.Fill(ds, "GeneralProcessReceiptHeaderDataSet");
            return ds;
        }
    }
}