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

namespace AxonApparels.ReportInline.Planning.ProcessProg
{
    public partial class ProcessProgInline : System.Web.UI.Page
    {

        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {


            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/ProcessProg/ProcessProgInlineReport.rdlc");
                PlanningProgMainInlineDataSet ds = GetData();
                PlanningProgDetInlineDataset ds1 = GetData1();             

                ReportDataSource datasource = new ReportDataSource("PlanningProgMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningProgDetInlineStatement", ds1.Tables[1]);
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
        public PlanningProgMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningProgMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["JobId"]) > 0 && Request.QueryString["JobId"] != null)
            {
                cmd.Parameters.Add("@JobId", SqlDbType.Int).Value = Request.QueryString["JobId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningProgMainInlineDataSet ds = new PlanningProgMainInlineDataSet();
            sda.Fill(ds, "PlanningProgMainInlineDataSet");
            return ds;
        }
        public PlanningProgDetInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningProcessPrgDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["JobId"]) > 0 && Request.QueryString["JobId"] != null)
            {
                cmd.Parameters.Add("@JobId", SqlDbType.Int).Value = Request.QueryString["JobId"].ToString();
            }

             if (Convert.ToInt32(Request.QueryString["Seqno"]) > 0 && Request.QueryString["Seqno"] != null)
            {
                cmd.Parameters.Add("@SeqNo", SqlDbType.Int).Value = Request.QueryString["Seqno"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningProgDetInlineDataset ds = new PlanningProgDetInlineDataset();
            sda.Fill(ds, "PlanningProgDetInlineDataset");
            return ds;
        }
    }

}