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
using Microsoft.Reporting.WebForms;

namespace AxonApparels.ReportInline.Production.ProductionInvoice
{
    public partial class ProductionInvoiceReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/ProductionInvoice/ProductionInvoiceReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("OrdRefNo", Request.QueryString["OrdRefNo"].ToString());
                ReportParameter rp2 = new ReportParameter("Remarks", Request.QueryString["Remarks"].ToString());
                ReportParameter rp3 = new ReportParameter("EWayBill", Request.QueryString["EWayBill"].ToString());
                ReportParameter rp4 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ReportParameter rp6 = new ReportParameter("Size", Request.QueryString["Size"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp5 = new ReportParameter("ImagePath", img);
                //ReportParameter rp6 = new ReportParameter("Type", Request.QueryString["Type"].ToString());

                ProductionInvMainlistInlineDataSet ds = GetData();
                ProductionInvOrdInlineDataSet ds1 = GetData1();
                ProductionInvAddlessInlineDataSet ds2 = GetData2();
                ProductionInvoiceHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("ProductionInvMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProductionInvOrdInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProductionInvAddlessInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProductionInvoiceHeaderStatement", ds3.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6 });
            }
        }
        public ProductionInvMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProductionInvMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            sda.SelectCommand = cmd;
            ProductionInvMainlistInlineDataSet ds = new ProductionInvMainlistInlineDataSet();
            sda.Fill(ds, "ProductionInvMainlistInlineDataSet");
            return ds;
        }
        public ProductionInvOrdInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProductionInvOrdInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            sda.SelectCommand = cmd;
            ProductionInvOrdInlineDataSet ds = new ProductionInvOrdInlineDataSet();
            sda.Fill(ds, "ProductionInvOrdInlineDataSet");
            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["Size"].ToString() == "0")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][2] = "";
                    }
                }
             
            }
            return ds;
        }
        public ProductionInvAddlessInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProductionInvAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            sda.SelectCommand = cmd;
            ProductionInvAddlessInlineDataSet ds = new ProductionInvAddlessInlineDataSet();
            sda.Fill(ds, "ProductionInvAddlessInlineDataSet");
            return ds;
        }
        public ProductionInvoiceHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PRODUCTION INVOICE";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProductionInvoiceHeaderDataSet ds = new ProductionInvoiceHeaderDataSet();
            sda.Fill(ds, "ProductionInvoiceHeaderDataSet");
            return ds;
        }
    }

}