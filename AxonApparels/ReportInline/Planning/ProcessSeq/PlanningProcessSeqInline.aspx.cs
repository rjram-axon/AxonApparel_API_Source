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


namespace AxonApparels.ReportInline.Planning.ProcessSeq
{
    public partial class PlanningProcessSeqInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/ProcessSeq/PlanningProSeqInlineReport.rdlc");
                PlanningProSeqMainInlineDataSet ds = GetData();
                PlanningProSeqDetInlineDataSet ds1 = GetData1();

                ReportDataSource datasource = new ReportDataSource("PlanningProSeqMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningProSeqDetInlineStatement", ds1.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);


            }
        }
        public PlanningProSeqMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningProgSeqMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["JobId"]) > 0 && Request.QueryString["JobId"] != null)
            {
                cmd.Parameters.Add("@JobId", SqlDbType.Int).Value = Request.QueryString["JobId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningProSeqMainInlineDataSet ds = new PlanningProSeqMainInlineDataSet();
            sda.Fill(ds, "PlanningProSeqMainInlineDataSet");
            return ds;
        }
        public PlanningProSeqDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningProgSeqDetlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["JobId"]) > 0 && Request.QueryString["JobId"] != null)
            {
                cmd.Parameters.Add("@JobId", SqlDbType.Int).Value = Request.QueryString["JobId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningProSeqDetInlineDataSet ds = new PlanningProSeqDetInlineDataSet();
            sda.Fill(ds, "PlanningProSeqDetInlineDataSet");
            return ds;
        }
    }
}