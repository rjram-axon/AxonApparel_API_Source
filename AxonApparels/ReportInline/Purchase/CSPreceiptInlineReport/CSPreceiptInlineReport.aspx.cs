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
using System.IO;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Purchase.CSPreceiptInlineReport
{
    public partial class CSPreceiptInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/CSPreceiptInlineReport/CSPreceiptInlineReport.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                CSPreceiptInlineDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("CSPreceiptInlineStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
                ReportViewer1.LocalReport.Refresh();
            }

        }

        public CSPreceiptInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetCSPreceiptinlinereport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
            sda.SelectCommand = cmd;
            CSPreceiptInlineDataSet ds = new CSPreceiptInlineDataSet();
            sda.Fill(ds, "CSPreceiptInlineDataSet");
            return ds;
        }


    }
}