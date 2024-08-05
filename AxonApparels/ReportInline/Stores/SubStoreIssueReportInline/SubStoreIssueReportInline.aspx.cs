using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Globalization;
using System;
using Microsoft.Reporting.WebForms;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Stores.SubStoreIssue
{
    public partial class SubStoreIssue : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/SubStoreIssueReportInline/SubStoreIssueReportInline.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                SubStoreIssueMasInlineDataSet ds = GetData();
                SubStoreIssueDetInlineDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("SubStoreIssueMasInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("SubStoreIssueDetInlineStatement", ds1.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public SubStoreIssueMasInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SubStoreIssueMasInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            sda.SelectCommand = cmd;
            SubStoreIssueMasInlineDataSet ds = new SubStoreIssueMasInlineDataSet();
            sda.Fill(ds, "SubStoreIssueMasInlineDataSet");
            return ds;
        }
        public SubStoreIssueDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SubStoreIssueDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            sda.SelectCommand = cmd;
            SubStoreIssueDetInlineDataSet ds = new SubStoreIssueDetInlineDataSet();
            sda.Fill(ds, "SubStoreIssueDetInlineDataSet");
            return ds;
        }
    }
}