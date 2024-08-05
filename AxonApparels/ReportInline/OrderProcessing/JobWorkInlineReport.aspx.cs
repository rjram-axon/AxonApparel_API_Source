using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.OrderProcessing
{
    public partial class JobWorkInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {

            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/OrderProcessing/JobWorkInlineReport.rdlc");

            this.ReportViewer1.LocalReport.EnableExternalImages = true;
            int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
            string img = CompanyDetails.GetCompanyImgpath(Companyid);
            ReportParameter rp1 = new ReportParameter("ImagePath", img);

            JobWrkMainDataSet ds = GetData();
            JobWrkDetailDataSet ds1 = GetData1();
            ReportDataSource datasource = new ReportDataSource("JobWrkMainDataset", ds.Tables[1]);
            ReportDataSource datasource1 = new ReportDataSource("JobWrkDetailDataset", ds1.Tables[1]);
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource);
            ReportViewer1.LocalReport.DataSources.Add(datasource1);
          
            ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
        }
        public JobWrkMainDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_JobWrkMainlistInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            JobWrkMainDataSet ds = new JobWrkMainDataSet();
            sda.Fill(ds, "JobWrkMainDataSet");
            return ds;
        }
        public JobWrkDetailDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_JobWrkDetaillistInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            JobWrkDetailDataSet ds = new JobWrkDetailDataSet();
            sda.Fill(ds, "JobWrkDetailDataSet");
            return ds;
        }

    }
}