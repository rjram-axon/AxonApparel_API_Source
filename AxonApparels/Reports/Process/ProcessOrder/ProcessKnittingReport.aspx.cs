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

namespace AxonApparels.Reports.Process.ProcessOrder
{
    public partial class ProcessKnittingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessOrder/ProcessKnittingReport.rdlc");
                ReportParameter rp1 = new ReportParameter("FromDate", Request.QueryString["FromDate"].ToString());
                ReportParameter rp2 = new ReportParameter("ToDate", Request.QueryString["ToDate"].ToString());
                ReportParameter rp3 = new ReportParameter("CompName", Request.QueryString["CompName"].ToString());
                ReportParameter rp4 = new ReportParameter("UserName", Request.QueryString["UserName"].ToString());
                Proc_KnittingReportDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("Proc_KnittingReportStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3,rp4 });
            }
        }
        public Proc_KnittingReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessKnittingStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandTimeout = 120;
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = Request.QueryString["compid"];
            cmd.Parameters.Add("@OrdNo", SqlDbType.Int).Value = Request.QueryString["OrderNo"];
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
            cmd.Parameters.Add("@Yarnid", SqlDbType.Int).Value = Request.QueryString["yarnid"];
            cmd.Parameters.Add("@Suppid", SqlDbType.Int).Value = Request.QueryString["supid"];
            cmd.Parameters.Add("@ProcOrdid", SqlDbType.Int).Value = Request.QueryString["procordid"];
            cmd.Parameters.Add("@StyId", SqlDbType.Int).Value = Request.QueryString["styid"]; 
         
            sda.SelectCommand = cmd;
            Proc_KnittingReportDataSet ds = new Proc_KnittingReportDataSet();
            sda.Fill(ds, "Proc_KnittingReportDataSet");
            return ds;
        }
    }
}