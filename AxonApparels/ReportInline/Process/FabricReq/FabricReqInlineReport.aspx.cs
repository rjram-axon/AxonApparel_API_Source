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

namespace AxonApparels.ReportInline.Process.FabricReq
{
    public partial class FabricReqInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/FabricReq/FabricReqInlineReport.rdlc");
                FabricReqMainDataSet ds = GetData();
                FabricReqDetailDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("FabricReqMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("FabricReqDetailInlineStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }
        public FabricReqMainDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricReqMainInlineRpt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];            
            sda.SelectCommand = cmd;
            FabricReqMainDataSet ds = new FabricReqMainDataSet();
            sda.Fill(ds, "FabricReqMainDataSet");
            return ds;
        }
        public FabricReqDetailDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabricReqDetailInlineRpt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            sda.SelectCommand = cmd;
            FabricReqDetailDataSet ds = new FabricReqDetailDataSet();
            sda.Fill(ds, "FabricReqDetailDataSet");
            return ds;
        }
    }
}