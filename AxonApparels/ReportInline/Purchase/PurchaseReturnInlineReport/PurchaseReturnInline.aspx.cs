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

namespace AxonApparels.ReportInline.Purchase.PurchaseReturnInlineReport
{
    public partial class PurchaseReturnInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseReturnInlineReport/PurchaseReturnInlineReport.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                // Img img = GetDataById();

                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);

                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                PurchaseReturnInlineDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("PurchaseReturnInlineStatement", ds.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            
            }

        }

        public PurchaseReturnInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurchaseReturnInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Retid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            PurchaseReturnInlineDataSet ds = new PurchaseReturnInlineDataSet();
            sda.Fill(ds, "PurchaseReturnInlineDataSet");
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