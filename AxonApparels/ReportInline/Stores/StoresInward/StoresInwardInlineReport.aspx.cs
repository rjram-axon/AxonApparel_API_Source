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

namespace AxonApparels.ReportInline.Stores.StoresInward
{
    public partial class StoresInwardInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresInward/StoresInwardInlineReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Supp", Request.QueryString["Supp"].ToString());
                ReportParameter rp2 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());
                StoresInwardMainlistInlineDataset ds = GetData();
                StoresInwardDetailInlineDataset ds1 = GetData1();
                StoresInwardHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("StoresInwardMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("StoresInwardDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("StoresInwardHeaderStatement", ds2.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp3 = new ReportParameter("ImagePath", img);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2,rp3});

            }
        }
        public StoresInwardMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockInwardMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            
            sda.SelectCommand = cmd;
            StoresInwardMainlistInlineDataset ds = new StoresInwardMainlistInlineDataset();
            sda.Fill(ds, "StoresInwardMainlistInlineDataset");
            return ds;
        }

        public StoresInwardDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockInwardDetaillistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            StoresInwardDetailInlineDataset ds = new StoresInwardDetailInlineDataset();
            sda.Fill(ds, "StoresInwardDetailInlineDataset");
            return ds;
        }
        public StoresInwardHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "SPECIAL REQUISITION";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            StoresInwardHeaderDataSet ds = new StoresInwardHeaderDataSet();
            sda.Fill(ds, "StoresInwardHeaderDataSet");
            return ds;
        }
    }
}