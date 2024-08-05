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

namespace AxonApparels.ReportInline.Stores.StoresGeneralMemoReportInline
{
    public partial class StoresGenMemoReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresGeneralMemoReportInline/StoresGenMemoReportInline.rdlc");

                ReportParameter rp1 = new ReportParameter("Itmrem", Request.QueryString["Itmrem"].ToString());
                ReportParameter rp2 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());
                ReportParameter rp3 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
                ReportParameter rp4 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp5 = new ReportParameter("ImagePath", img);

                StoresGenMemoMainlistInlineDataSet ds = GetData();
                StoresGenMemoDetInlineDataSet ds1 = GetData1();
                StoreGenMemoHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("StoreGenMemoMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("StoresGenMemoDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("StoreGenMemoHeaderStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5 });

            }
        }

        public StoresGenMemoMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreGenMemoMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Gen_memo_Masid", SqlDbType.Int).Value = Request.QueryString["MasId"];
           
            sda.SelectCommand = cmd;
            StoresGenMemoMainlistInlineDataSet ds = new StoresGenMemoMainlistInlineDataSet();
            sda.Fill(ds, "StoresGenMemoMainlistInlineDataSet");
            return ds;
        }
        public StoresGenMemoDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreGenMemoDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Gen_memo_Masid", SqlDbType.Int).Value = Request.QueryString["MasId"];
            
            sda.SelectCommand = cmd;
            StoresGenMemoDetInlineDataSet ds = new StoresGenMemoDetInlineDataSet();
            sda.Fill(ds, "StoresGenMemoDetInlineDataSet");
            return ds;
        }
        public StoreGenMemoHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["MasId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "GENERAL MEMO";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            StoreGenMemoHeaderDataSet ds = new StoreGenMemoHeaderDataSet();
            sda.Fill(ds, "StoreGenMemoHeaderDataSet");
            return ds;
        }
    }
}