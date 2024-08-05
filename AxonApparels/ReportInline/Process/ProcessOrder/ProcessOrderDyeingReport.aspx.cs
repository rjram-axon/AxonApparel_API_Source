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
namespace AxonApparels.ReportInline.Process.ProcessOrder
{
    public partial class ProcessOrderDyeingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.rdlc");

            ProcessOrderMainListInlineDataset ds = GetData();
            ProcessOrderDyeDataSet ds1 = GetData1();
            ProcessOrderRefNoConeWindingDataset ds2 = GetData2();

            ReportDataSource datasource = new ReportDataSource("ProcessOrderMainListInlineStatement", ds.Tables[1]);
            ReportDataSource datasource2 = new ReportDataSource("ProcessOrderRefNoStatement", ds2.Tables[1]);

            ReportDataSource datasource1 = new ReportDataSource("ProcessOrderDyeingReport", ds1.Tables[1]);
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource);
            ReportViewer1.LocalReport.DataSources.Add(datasource2);
            ReportViewer1.LocalReport.DataSources.Add(datasource1);

        }

        public ProcessOrderMainListInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderMainListInlineDataset ds = new ProcessOrderMainListInlineDataset();
            sda.Fill(ds, "ProcessOrderMainListInlineDataset");
            return ds;
        }
        public ProcessOrderDyeDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderDyeDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderDyeDataSet ds = new ProcessOrderDyeDataSet();
            sda.Fill(ds, "ProcessOrderDyeDataSet");
            return ds;
        }

        public ProcessOrderRefNoConeWindingDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderRefnoConeWindingInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderRefNoConeWindingDataset ds = new ProcessOrderRefNoConeWindingDataset();
            sda.Fill(ds, "ProcessOrderRefNoConeWindingDataset");
            return ds;
        }

    }



}