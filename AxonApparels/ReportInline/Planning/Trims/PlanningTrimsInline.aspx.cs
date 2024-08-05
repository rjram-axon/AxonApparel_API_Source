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

namespace AxonApparels.ReportInline.Planning.Trims
{
    public partial class PlanningTrimsInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Trims/PlanningTrimsInlineReport.rdlc");
                PlanningTrimsMainInlineDataSet ds = GetData();
                PlanningTrimsDetInlineDataSet ds1 = GetData1();
                //WorkOrderColSizDataset ds2 = GetData2();
                //WorkOrderPlanSummDataset ds3 = GetData3();
                //WorkOrderColorDataset ds4 = GetData4();
                //WorkColorAssortDataset ds5 = GetData5();

                ReportDataSource datasource = new ReportDataSource("PlanningTrimsMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningTrimsDetInlineStatement", ds1.Tables[1]);
                //ReportDataSource datasource2 = new ReportDataSource("WorkOrderColSizStatement", ds2.Tables[1]);
                //ReportDataSource datasource3 = new ReportDataSource("WorkOrderPlanSummStatement", ds3.Tables[1]);
                //ReportDataSource datasource4 = new ReportDataSource("WorkOrderColorStatement", ds4.Tables[1]);
                //ReportDataSource datasource5 = new ReportDataSource("WorkColorAssortStatement", ds5.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                //ReportViewer1.LocalReport.DataSources.Add(datasource2);
                //ReportViewer1.LocalReport.DataSources.Add(datasource3);
                //ReportViewer1.LocalReport.DataSources.Add(datasource4);
                //ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public PlanningTrimsMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsumptionMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
       
            sda.SelectCommand = cmd;
            PlanningTrimsMainInlineDataSet ds = new PlanningTrimsMainInlineDataSet();
            sda.Fill(ds, "PlanningTrimsMainInlineDataSet");
            return ds;
        }
        public PlanningTrimsDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningTrimsDdetlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyleRowid", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningTrimsDetInlineDataSet ds = new PlanningTrimsDetInlineDataSet();
            sda.Fill(ds, "PlanningTrimsDetInlineDataSet");
            return ds;
        }
    }
}