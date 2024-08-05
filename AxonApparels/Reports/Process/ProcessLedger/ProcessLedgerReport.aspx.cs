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

namespace AxonApparels.Reports.Process.ProcessLedger
{
    public partial class ProcessLedgerReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessLedger/ProcessLedgerReport.rdlc");
                ProcessLedgerDetailDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessLedgerDetailStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public ProcessLedgerDetailDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessLedgerDetailStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar,30).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar,30).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@bmasid", SqlDbType.VarChar,50).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@CompanyUnitId", SqlDbType.Int).Value = Request.QueryString["unitid"];
            cmd.Parameters.Add("@BuyerId", SqlDbType.Int).Value = Request.QueryString["Buyid"];
            cmd.Parameters.Add("@Refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
            cmd.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Procid"];
            cmd.Parameters.Add("@ProcessOrId", SqlDbType.Int).Value = Request.QueryString["Processor"];
          
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
           

            cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
            sda.SelectCommand = cmd;
            ProcessLedgerDetailDataSet ds = new ProcessLedgerDetailDataSet();
            sda.Fill(ds, "ProcessLedgerDetailDataSet");
            return ds;
        }
    }
}