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
    public partial class ProcessOrderReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessOrder/ProcessOrderReport.rdlc");
                ReportParameter rp1 = new ReportParameter("FromDate", Request.QueryString["FromDate"].ToString());
                ReportParameter rp2 = new ReportParameter("ToDate", Request.QueryString["ToDate"].ToString());
                ReportParameter rp3 = new ReportParameter("CompName", Request.QueryString["CompName"].ToString());
                ReportParameter rp4 = new ReportParameter("ProName", Request.QueryString["ProName"].ToString());
                ReportParameter rp5 = new ReportParameter("UserName", Request.QueryString["UserName"].ToString());
                ProcessOrdRptDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessOrderRptStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp5 });
            }
        }
        public ProcessOrdRptDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrdRptStmnt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@bmasid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            cmd.Parameters.Add("@fabid", SqlDbType.Int).Value = Request.QueryString["Fabid"];
            cmd.Parameters.Add("@refid", SqlDbType.Int).Value = Request.QueryString["Ref"];
            cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
            cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
            cmd.Parameters.Add("@yrnid", SqlDbType.Int).Value = Request.QueryString["yarnid"];
            cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["supid"];

            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();

            cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
            
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            ProcessOrdRptDataSet ds = new ProcessOrdRptDataSet();
            sda.Fill(ds, "ProcessOrdRptDataSet");
            return ds;
        }
    }
}