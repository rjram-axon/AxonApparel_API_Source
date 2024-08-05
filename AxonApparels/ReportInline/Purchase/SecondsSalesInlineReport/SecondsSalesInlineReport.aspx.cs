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

namespace AxonApparels.ReportInline.Purchase.SecondsSalesInlineReport
{
    public partial class SecondsSalesInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/SecondsSalesInlineReport/SecondsSalesInlineReport.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
               // Img img = GetDataById();

                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                
                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                SecondsSalesInlineReportDataSet ds = GetData();
                SecondsSalesAddlessDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("SecondsSalesInlineReportStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("SecondsSalesAddlessStatement", ds1.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }


        public SecondsSalesInlineReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSecondsSalesInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            SecondsSalesInlineReportDataSet ds = new SecondsSalesInlineReportDataSet();
            sda.Fill(ds, "SecondsSalesInlineReportDataSet");
            return ds;
        }


        public SecondsSalesAddlessDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSecondsSalesAddless", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            SecondsSalesAddlessDataSet ds = new SecondsSalesAddlessDataSet();
            sda.Fill(ds, "SecondsSalesAddlessDataSet");
            return ds;
        }




    }

    public class Img
    {
        public string companyImg { get; set; }
        public string CreatedbyImg { get; set; }
        public string ApprovedbyImg { get; set; }
    }

}