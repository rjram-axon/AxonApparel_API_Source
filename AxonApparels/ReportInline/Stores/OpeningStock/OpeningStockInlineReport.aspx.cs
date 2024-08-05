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

namespace AxonApparels.ReportInline.Stores.OpeningStock
{
    public partial class OpeningStockInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/OpeningStock/OpeningStockInlineReport.rdlc");

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp3 = new ReportParameter("ImagePath", img);

                ReportParameter rp1 = new ReportParameter("Itmrem", Request.QueryString["Itmrem"].ToString());
                ReportParameter rp2 = new ReportParameter("Manufact", Request.QueryString["Manufact"].ToString());

                OpeningStockMainlistInlineDataset ds = GetData();
                OpeningStockDetailInlineDataset ds1 = GetData1();
                OpeningStkHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("OpeningStockMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("OpeningStockDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("OpeningStkHeaderStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2,rp3 });

            }
        }

        public OpeningStockMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpeningStockMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@StkNo", SqlDbType.VarChar).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            OpeningStockMainlistInlineDataset ds = new OpeningStockMainlistInlineDataset();
            sda.Fill(ds, "OpeningStockMainlistInlineDataset");
            return ds;
        }

        public OpeningStockDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpeningStockDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@StkNo", SqlDbType.VarChar).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            OpeningStockDetailInlineDataset ds = new OpeningStockDetailInlineDataset();
            sda.Fill(ds, "OpeningStockDetailInlineDataset");
            return ds;
        }
        public OpeningStkHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "OPENING STOCK";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            OpeningStkHeaderDataSet ds = new OpeningStkHeaderDataSet();
            sda.Fill(ds, "OpeningStkHeaderDataSet");
            return ds;
        }
    }
}