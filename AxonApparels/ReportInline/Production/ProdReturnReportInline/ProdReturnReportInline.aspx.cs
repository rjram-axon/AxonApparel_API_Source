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

namespace AxonApparels.ReportInline.Production.ProdReturnReportInline
{
    public partial class ProdReturnReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/ProdReturnReportInline/ProdReturnReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("RetlossDet", Request.QueryString["RetlossDet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp4 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ProdReturnMainlistInlineDataSet ds = GetData();
                ProdReturnDetailsInlineDataSet ds1 = GetData1();
                ProdReturnHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("ProdReturnMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProdReturnDetailsInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProdReturnHeaderStatement", ds2.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp5 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4,rp5 });
            }
        }

        public ProdReturnMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdReturnMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Production_Recpt_masid", SqlDbType.Int).Value = Request.QueryString["ProdRecptId"];
           
            sda.SelectCommand = cmd;
            ProdReturnMainlistInlineDataSet ds = new ProdReturnMainlistInlineDataSet();
            sda.Fill(ds, "ProdReturnMainlistInlineDataSet");
            return ds;
        }
        public ProdReturnDetailsInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdReturnDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Production_Recpt_masid", SqlDbType.Int).Value = Request.QueryString["ProdRecptId"];
            
            sda.SelectCommand = cmd;
            ProdReturnDetailsInlineDataSet ds = new ProdReturnDetailsInlineDataSet();
            sda.Fill(ds, "ProdReturnDetailsInlineDataSet");
            return ds;
        }
        public ProdReturnHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdRecptId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS RETURN";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProdReturnHeaderDataSet ds = new ProdReturnHeaderDataSet();
            sda.Fill(ds, "ProdReturnHeaderDataSet");
            return ds;
        }
    }
}