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

namespace AxonApparels.ReportsInline.Process.ProcessIssue
{
    public partial class ProcessIssueReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessIssue/ProcessIssueReportInline.rdlc");

                ReportParameter rp1 = new ReportParameter("Ordqtydet", Request.QueryString["Ordqtydet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());
                ReportParameter rp4 = new ReportParameter("Bal", Request.QueryString["Bal"].ToString());
                ReportParameter rp5 = new ReportParameter("Lotdet", Request.QueryString["Lotdet"].ToString());
                ReportParameter rp6 = new ReportParameter("Millname", Request.QueryString["Millname"].ToString());
                ReportParameter rp7 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());

                ReportParameter rp8 = new ReportParameter("Footer", Request.QueryString["Footer"].ToString());
                ReportParameter rp9 = new ReportParameter("InpGst", Request.QueryString["InpGst"].ToString());
                ReportParameter rp10 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp11 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ReportParameter rp12 = new ReportParameter("Refno", Request.QueryString["Refno"].ToString());
             
                ProcessIssueMainlistInlineDataset ds = GetData();
                ProcessIssueDetailInlineDataset ds1 = GetData1();
                ProcessIssueOrdItmInlineDataset ds2 = GetData2();
                ProcessIssueHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("ProcessIssueMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessIssueDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessIssueOrdItmInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProcessIssueHeaderStatement", ds3.Tables[1]);    
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7,rp8,rp9,rp10,rp11,rp12 });

               
            }

        }

        public ProcessIssueMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssueMainListInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessIssueMainlistInlineDataset ds = new ProcessIssueMainlistInlineDataset();
            sda.Fill(ds, "ProcessIssueMainlistInlineDataset");
            return ds;
        }

        public ProcessIssueDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssueDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessIssueDetailInlineDataset ds = new ProcessIssueDetailInlineDataset();
            sda.Fill(ds, "ProcessIssueDetailInlineDataset");
            return ds;
        }

        public ProcessIssueOrdItmInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssueOrdItmInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessIssueOrdItmInlineDataset ds = new ProcessIssueOrdItmInlineDataset();
            sda.Fill(ds, "ProcessIssueOrdItmInlineDataset");
            return ds;
        }
        public ProcessIssueHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS ISSUE - EXTERNAL";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProcessIssueHeaderDataSet ds = new ProcessIssueHeaderDataSet();
            sda.Fill(ds, "ProcessIssueHeaderDataSet");
            return ds;
        }

    }
}