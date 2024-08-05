using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Globalization;
using System;
using Microsoft.Reporting.WebForms;

namespace AxonApparels.ReportInline.Stores.StockAudit
{
    public partial class StockAuditInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StockAudit/StockAuditInlineReport.rdlc");
                StockAuditMainlistInlineDataset ds = GetData();
                StockAuditDetailInlineDataset ds1 = GetData1();
                StockAuditHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("StockAuditMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("StockAuditDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("StockAuditHeaderStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);

            }
        }
        public StockAuditMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockAuditMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            //if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            //{
            //    cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            //}
            
            sda.SelectCommand = cmd;
            StockAuditMainlistInlineDataset ds = new StockAuditMainlistInlineDataset();
            sda.Fill(ds, "StockAuditMainlistInlineDataset");
            return ds;
        }

        public StockAuditDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockAuditDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
          
            sda.SelectCommand = cmd;
            StockAuditDetailInlineDataset ds = new StockAuditDetailInlineDataset();
            sda.Fill(ds, "StockAuditDetailInlineDataset");
            return ds;
        }
        public StockAuditHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "STOCK AUDIT";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            StockAuditHeaderDataSet ds = new StockAuditHeaderDataSet();
            sda.Fill(ds, "StockAuditHeaderDataSet");
            return ds;
        }
    }
}