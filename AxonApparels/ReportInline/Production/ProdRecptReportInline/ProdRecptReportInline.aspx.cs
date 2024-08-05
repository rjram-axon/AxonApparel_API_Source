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

namespace AxonApparels.ReportInline.Production.ProdRecptReportInline
{
    public partial class ProdRecptReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/ProdRecptReportInline/ProdRecptReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("RetLossdet", Request.QueryString["RetLossdet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Lotdet", Request.QueryString["Lotdet"].ToString());
                ReportParameter rp4 = new ReportParameter("Procord", Request.QueryString["Procord"].ToString());
                ReportParameter rp5 = new ReportParameter("POdet", Request.QueryString["POdet"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp7 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ProdRecptMainlistInlineDataSet ds = GetData();
                ProdRecptDetInlineDataSet ds1 = GetData1();
                ProdRecptIssDetInlineDataSet ds2 = GetData2();
                ProdRecptHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("ProdRecptMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProdRecptDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProdRecptIssDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProdRecptHeaderStatement", ds3.Tables[1]);

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp8 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7,rp8 });

            }
        }


        public ProdRecptMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdRecptMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Prod_Recpt_Masid", SqlDbType.Int).Value = Request.QueryString["ProdRecptId"];
            
            sda.SelectCommand = cmd;
            ProdRecptMainlistInlineDataSet ds = new ProdRecptMainlistInlineDataSet();
            sda.Fill(ds, "ProdRecptMainlistInlineDataSet");
            return ds;
        }
        public ProdRecptDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdRecptdetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Prod_Recpt_Masid", SqlDbType.Int).Value = Request.QueryString["ProdRecptId"];
            
            sda.SelectCommand = cmd;
            ProdRecptDetInlineDataSet ds = new ProdRecptDetInlineDataSet();
            sda.Fill(ds, "ProdRecptDetInlineDataSet");
            return ds;
        }
        public ProdRecptIssDetInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdRecptissuedetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Prod_Recpt_Masid", SqlDbType.Int).Value = Request.QueryString["ProdRecptId"];
           
            sda.SelectCommand = cmd;
            ProdRecptIssDetInlineDataSet ds = new ProdRecptIssDetInlineDataSet();
            sda.Fill(ds, "ProdRecptIssDetInlineDataSet");
            return ds;
        }
        public ProdRecptHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdRecptId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS RECEIPT";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProdRecptHeaderDataSet ds = new ProdRecptHeaderDataSet();
            sda.Fill(ds, "ProdRecptHeaderDataSet");
            return ds;
        }
    }
}