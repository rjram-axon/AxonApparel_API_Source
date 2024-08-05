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

namespace AxonApparels.ReportInline.Production.JobReceipt
{
    public partial class JobReceiptInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/JobReceipt/JobReceiptInlineReport.rdlc");
                JobRecptMainDataSet ds = GetData();
                JobRecptDetailDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("JobRecptMainStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("JobRecptDetailStatement", ds1.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public JobRecptMainDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_JobRecptMainInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            JobRecptMainDataSet ds = new JobRecptMainDataSet();
            sda.Fill(ds, "JobRecptMainDataSet");
            return ds;
        }
        public JobRecptDetailDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_JobRecptDetailInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];

            sda.SelectCommand = cmd;
            JobRecptDetailDataSet ds = new JobRecptDetailDataSet();
            sda.Fill(ds, "JobRecptDetailDataSet");
            return ds;
        }
    }
}