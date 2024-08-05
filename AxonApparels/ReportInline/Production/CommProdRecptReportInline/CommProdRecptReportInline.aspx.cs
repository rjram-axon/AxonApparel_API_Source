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

namespace AxonApparels.ReportInline.Production.CommProdRecptReportInline
{
    public partial class CommProdRecptReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/CommProdRecptReportInline/CommProdRcptReportInline.rdlc");

                ReportParameter rp1 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp2 = new ReportParameter("Bundle", Request.QueryString["Bundle"].ToString());
                ReportParameter rp3 = new ReportParameter("Lotno", Request.QueryString["Lotno"].ToString());
                ReportParameter rp4 = new ReportParameter("Ordrefno", Request.QueryString["Ordrefno"].ToString());
                ReportParameter rp5 = new ReportParameter("Prodorddet", Request.QueryString["Prodorddet"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp7 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp8 = new ReportParameter("ImagePath", img);

                CommProdRecptMainlistInlineDataSet ds = GetData();
                CommProdRecptDetInlineDataSet ds1 = GetData1();
                CommProdRecptIssDetInlineDataSet ds2 = GetData2();
                CommProdRecptHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("CommProdRecptMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CommProdRecptDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CommProdRecptIssDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("CommProdRecptHeaderStatement", ds3.Tables[1]);  
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8 });

            }
        }
        public CommProdRecptMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdRecptMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@RecptId", SqlDbType.Int).Value = Request.QueryString["ProdReceiptEditId"];
           
            sda.SelectCommand = cmd;
            CommProdRecptMainlistInlineDataSet ds = new CommProdRecptMainlistInlineDataSet();
            sda.Fill(ds, "CommProdRecptMainlistInlineDataSet");
            return ds;
        }
        public CommProdRecptDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdRecptdetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@RecptId", SqlDbType.Int).Value = Request.QueryString["ProdReceiptEditId"];
           
            sda.SelectCommand = cmd;
            CommProdRecptDetInlineDataSet ds = new CommProdRecptDetInlineDataSet();
            sda.Fill(ds, "CommProdRecptDetInlineDataSet");
            return ds;
        }
        public CommProdRecptIssDetInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdRecptissuedetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@RecptId", SqlDbType.Int).Value = Request.QueryString["ProdReceiptEditId"];
            
            sda.SelectCommand = cmd;
            CommProdRecptIssDetInlineDataSet ds = new CommProdRecptIssDetInlineDataSet();
            sda.Fill(ds, "CommProdRecptIssDetInlineDataSet");
            return ds;
        }
        public CommProdRecptHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdReceiptEditId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PRODUCTION RECEIPT";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            CommProdRecptHeaderDataSet ds = new CommProdRecptHeaderDataSet();
            sda.Fill(ds, "CommProdRecptHeaderDataSet");
            return ds;
        }
    }
}

