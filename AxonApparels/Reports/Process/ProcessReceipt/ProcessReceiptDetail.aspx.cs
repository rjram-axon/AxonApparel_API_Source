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

namespace AxonApparels.Reports.Process.ProcessReceipt
{
    public partial class ProcessReceiptDetail : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessReceipt/ProcessReceiptDetail.rdlc");
                ReportParameter rp1 = new ReportParameter("FromDate", Request.QueryString["FromDate"].ToString());
                ReportParameter rp2 = new ReportParameter("ToDate", Request.QueryString["ToDate"].ToString());
                ReportParameter rp3 = new ReportParameter("CompName", Request.QueryString["CompName"].ToString());
                ReportParameter rp4 = new ReportParameter("UserName", Request.QueryString["UserName"].ToString());
                ProcessReceiptDetailDataset ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessRecptDetailStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4 });
            }
        }
        public ProcessReceiptDetailDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessRecptDetailRptStmnt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["Suppid"];
            cmd.Parameters.Add("@fabid", SqlDbType.Int).Value = Request.QueryString["Fabid"];
            cmd.Parameters.Add("@refid", SqlDbType.Int).Value = Request.QueryString["Ref"];
            cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
            cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
            cmd.Parameters.Add("@yrnid", SqlDbType.Int).Value = Request.QueryString["yarnid"];
            cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            ProcessReceiptDetailDataset ds = new ProcessReceiptDetailDataset();
            sda.Fill(ds, "ProcessReceiptDetailDataset");
            return ds;
        }
    }
}