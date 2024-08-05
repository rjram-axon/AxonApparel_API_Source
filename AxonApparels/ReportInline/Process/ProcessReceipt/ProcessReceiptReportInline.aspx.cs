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

namespace AxonApparels.ReportsInline.Process.ProcessReceipt
{
    public partial class ProcessReceiptReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessReceipt/ProcessReceiptReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("RetLossdet", Request.QueryString["RetLossdet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Lotdet", Request.QueryString["Lotdet"].ToString());
                ReportParameter rp4 = new ReportParameter("Procord", Request.QueryString["Procord"].ToString());
                ReportParameter rp5 = new ReportParameter("POdet", Request.QueryString["POdet"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp7 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ReportParameter rp8 = new ReportParameter("ProcessName", Request.QueryString["ProcessName"].ToString());
                ReportParameter rp9 = new ReportParameter("OrdNo", Request.QueryString["OrdNo"].ToString());
                ReportParameter rp10 = new ReportParameter("RefNo", Request.QueryString["RefNo"].ToString());
                ReportParameter rp11 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp12 = new ReportParameter("ImagePath", img);

                ProcessReceiptMainListInlineDataset ds = GetData();
                ProcessReceiptDetailInlineDataset ds1 = GetData1();
                ProcessReceiptProcOrdDetInlineDataset ds2 = GetData2();
                ProcessReceiptGrnDetInlineDataset ds3 = GetData3();
                ProcessReceiptHeaderDataSet ds4 = GetData4();
                ProcessReceiptDyeingDetailDataSet ds5 = GetData5();
                ProcessRecptMultiOrdDataSet ds6 = GetData6();
                ProcessReceiptDetailInputInlineDataSet ds7 = GetData7();
                ProcessRecptMultiOrdNoDataSet ds8 = GetData8();

                ReportDataSource datasource = new ReportDataSource("ProcessReceiptMainListInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessReceiptDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessReceiptProcOrdDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProcessReceiptGrnDetInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("ProcessReceiptHeaderStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("ProcessReceiptDyeingDetailInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("ProcessRecptMultiOrdStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("ProcessReceiptDetailInputInlineStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("ProcessRecptMultiOrdNoStatement", ds8.Tables[1]);

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
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11,rp12 });
            }
        }

        public ProcessReceiptMainListInlineDataset GetData()
        {
              string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptMainListInline", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

                sda.SelectCommand = cmd;
                ProcessReceiptMainListInlineDataset ds = new ProcessReceiptMainListInlineDataset();
                sda.Fill(ds, "ProcessReceiptMainListInlineDataset");
                return ds;
            }
            else {
                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptMainListInlineAudit", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

                sda.SelectCommand = cmd;
                ProcessReceiptMainListInlineDataset ds = new ProcessReceiptMainListInlineDataset();
                sda.Fill(ds, "ProcessReceiptMainListInlineDataset");
                return ds;
            }
        }

        public ProcessReceiptDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessReceiptDetailInlineDataset ds = new ProcessReceiptDetailInlineDataset();
            sda.Fill(ds, "ProcessReceiptDetailInlineDataset");
            return ds;
        }

        public ProcessReceiptProcOrdDetInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptProcessOrdDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            ProcessReceiptProcOrdDetInlineDataset ds = new ProcessReceiptProcOrdDetInlineDataset();
            sda.Fill(ds, "ProcessReceiptProcOrdDetInlineDataset");
            return ds;
        }

        public ProcessReceiptGrnDetInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptGRNDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            
            sda.SelectCommand = cmd;
            ProcessReceiptGrnDetInlineDataset ds = new ProcessReceiptGrnDetInlineDataset();
            sda.Fill(ds, "ProcessReceiptGrnDetInlineDataset");
            return ds;
        }
        public ProcessReceiptHeaderDataSet GetData4()
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
            ProcessReceiptHeaderDataSet ds = new ProcessReceiptHeaderDataSet();
            sda.Fill(ds, "ProcessReceiptHeaderDataSet");
            return ds;
        }

        public ProcessReceiptDyeingDetailDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptDyeingDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessReceiptDyeingDetailDataSet ds = new ProcessReceiptDyeingDetailDataSet();
            sda.Fill(ds, "ProcessReceiptDyeingDetailDataSet");
            return ds;
        }
        public ProcessRecptMultiOrdDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessRecptOrdnoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessRecptMultiOrdDataSet ds = new ProcessRecptMultiOrdDataSet();
            sda.Fill(ds, "ProcessRecptMultiOrdDataSet");
            return ds;
        }
        public ProcessReceiptDetailInputInlineDataSet GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("proc_apparel_ProcessRecptInpInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessReceiptDetailInputInlineDataSet ds = new ProcessReceiptDetailInputInlineDataSet();
            sda.Fill(ds, "ProcessReceiptDetailInputInlineDataSet");
            return ds;
        }
        public ProcessRecptMultiOrdNoDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessRecptBulkOrdnoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessRecptMultiOrdNoDataSet ds = new ProcessRecptMultiOrdNoDataSet();
            sda.Fill(ds, "ProcessRecptMultiOrdNoDataSet");
            return ds;
        }

        public String GetUserGroup()
        {

            string grp = "";
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetUserGroupName", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Userid", SqlDbType.Int).Value = Request.QueryString["Userid"].ToString();
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    grp = rdr["GroupName"].ToString();
                }
            }
            return grp;
        }


    }
}