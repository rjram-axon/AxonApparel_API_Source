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

namespace AxonApparels.ReportInline.OrderProcessing
{
    public partial class SampleOrderInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/OrderProcessing/SampleOrderInlineReport.rdlc");
            SampleOrderHeaderDataSet ds = GetData();
            SampleOrderAssortDataSet ds1 = GetData1();
            SampleOrderYarnDataSet ds2 = GetData2();
            SampleOrderFabricDataSet ds3 = GetData3();
            ReportDataSource datasource = new ReportDataSource("SampleOrderHeaderInlineStatement", ds.Tables[1]);
            ReportDataSource datasource1 = new ReportDataSource("SampleOrderAssortInlineStatement", ds1.Tables[1]);
            ReportDataSource datasource2 = new ReportDataSource("SampleOrderYarnInlineStatement", ds2.Tables[1]);
            ReportDataSource datasource3 = new ReportDataSource("SampleOrderFabricInlineStatement", ds3.Tables[1]);

            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource);
            ReportViewer1.LocalReport.DataSources.Add(datasource1);
            ReportViewer1.LocalReport.DataSources.Add(datasource2);
            ReportViewer1.LocalReport.DataSources.Add(datasource3);

        }
        public SampleOrderHeaderDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SampleOrderInlineHeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@Bmasid", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            SampleOrderHeaderDataSet ds = new SampleOrderHeaderDataSet();
            sda.Fill(ds, "SampleOrderHeaderDataSet");
            return ds;
        }
        public SampleOrderAssortDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SampleOrderInlineAssortDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@Bmasid", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            SampleOrderAssortDataSet ds = new SampleOrderAssortDataSet();
            sda.Fill(ds, "SampleOrderAssortDataSet");
            return ds;
        }
        public SampleOrderYarnDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SampleOrderInlineYarnDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@Bmasid", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            SampleOrderYarnDataSet ds = new SampleOrderYarnDataSet();
            sda.Fill(ds, "SampleOrderYarnDataSet");
            return ds;
        }
        public SampleOrderFabricDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SampleOrderInlineFabricDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@Bmasid", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            SampleOrderFabricDataSet ds = new SampleOrderFabricDataSet();
            sda.Fill(ds, "SampleOrderFabricDataSet");
            return ds;
        }
    }
    
}