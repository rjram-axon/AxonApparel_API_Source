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

namespace AxonApparels.ReportInline.Process.ProcessInvoice
{
    public partial class ProcessInvoiceInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessInvoice/ProcessInvoiceInlineReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Debcred", Request.QueryString["Debcred"].ToString());
                ReportParameter rp2 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());
                ReportParameter rp3 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                ReportParameter rp4 = new ReportParameter("Pendingdet", Request.QueryString["Pendingdet"].ToString());
                ReportParameter rp5 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp7 = new ReportParameter("ImagePath", img);
                ReportParameter rp8 = new ReportParameter("Type", Request.QueryString["Type"].ToString());

                ProcessInvMainlistInlineDataSet ds = GetData();
                ProcessInvoiceDetailInlineDataset ds1 = GetData1();
                ProcessInvoiceOrdDetInlineDataset ds2 = GetData2();
                ProcessInvoiceAddLessInlineDataset ds3 = GetData3();
                ProcessInvoiceHeaderDataSet ds4 = GetData4();
                ReportDataSource datasource = new ReportDataSource("ProcessInvMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessInvoiceDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessInvoiceOrderdetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProcessInvoiceAddlessInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("ProcessInvoiceHeaderStatement", ds4.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8 });
            }
        }
        public ProcessInvMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessInvMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@Type", SqlDbType.Char,1).Value = Request.QueryString["Type"].ToString();
            sda.SelectCommand = cmd;
            ProcessInvMainlistInlineDataSet ds = new ProcessInvMainlistInlineDataSet();
            sda.Fill(ds, "ProcessInvMainlistInlineDataSet");
            return ds;
        }

        public ProcessInvoiceDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessInvDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessInvoiceDetailInlineDataset ds = new ProcessInvoiceDetailInlineDataset();
            sda.Fill(ds, "ProcessInvoiceDetailInlineDataset");
            return ds;
        }
        public ProcessInvoiceOrdDetInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessInvOrdInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@Style", SqlDbType.Int).Value = Request.QueryString["Style"].ToString();
            sda.SelectCommand = cmd;
            ProcessInvoiceOrdDetInlineDataset ds = new ProcessInvoiceOrdDetInlineDataset();
            sda.Fill(ds, "ProcessInvoiceOrdDetInlineDataset");
            return ds;
        }

        public ProcessInvoiceAddLessInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessInvAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            
            sda.SelectCommand = cmd;
            ProcessInvoiceAddLessInlineDataset ds = new ProcessInvoiceAddLessInlineDataset();
            sda.Fill(ds, "ProcessInvoiceAddLessInlineDataset");
            return ds;
        }
        public ProcessInvoiceHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS INVOICE";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProcessInvoiceHeaderDataSet ds = new ProcessInvoiceHeaderDataSet();
            sda.Fill(ds, "ProcessInvoiceHeaderDataSet");
            return ds;
        }
    }
}