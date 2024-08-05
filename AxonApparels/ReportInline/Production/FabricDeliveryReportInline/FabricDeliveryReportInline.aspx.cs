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

namespace AxonApparels.ReportInline.Production.FabricDeliveryReportInline
{
    public partial class FabricDeliveryReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/FabricDeliveryReportInline/FabricDeliveryReportInline.rdlc");
                FabricDeliveryMainInlineDataSet ds = GetData();
                FabricDeliveryOrddetInlineDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("FabricDeliveryMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("FabricDeliveryOrddetInlineStatement", ds1.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportParameter rp2 = new ReportParameter("Type", Request.QueryString["Maintype"].ToString());
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 ,rp2 });
            }
        }

        public FabricDeliveryMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricDeliveryMainInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FabDelyIssueId", SqlDbType.Int).Value = Request.QueryString["FabDelyIssueId"];
           
            sda.SelectCommand = cmd;
            FabricDeliveryMainInlineDataSet ds = new FabricDeliveryMainInlineDataSet();
            sda.Fill(ds, "FabricDeliveryMainInlineDataSet");
            return ds;
        }

        public FabricDeliveryOrddetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricDeliveryOrddetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FabDelyIssueId", SqlDbType.Int).Value = Request.QueryString["FabDelyIssueId"];
            
            sda.SelectCommand = cmd;
            FabricDeliveryOrddetInlineDataSet ds = new FabricDeliveryOrddetInlineDataSet();
            sda.Fill(ds, "FabricDeliveryOrddetInlineDataSet");
            return ds;
        }
    }
}