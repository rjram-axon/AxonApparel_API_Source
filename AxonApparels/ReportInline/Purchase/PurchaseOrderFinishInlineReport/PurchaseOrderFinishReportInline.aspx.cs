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

namespace AxonApparels.ReportInline.Purchase.PurchaseOrderFinishInlineReport
{
    public partial class PurchaseOrderFinishReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderFinishInlineReport/PurchaseOrderFinishReportInline.rdlc");


                PurchaseOrderFinishMainReportDataSet ds = GetData();
                PurchaseOrderFinishDetReportDataSet ds1 = GetData1();
                PurchaseOrderFinishGstReportDataSet ds2 = GetData2();
                PurchaseOrderFinishAddlessReportDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("PurchaseOrderFinishMainReportStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseOrderFinishDetReportStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseOrderFinishGstReportStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseOrderFinishAddlessReportStatement", ds3.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

            }
        }
        public PurchaseOrderFinishMainReportDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdmainlistFinishInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderFinishMainReportDataSet ds = new PurchaseOrderFinishMainReportDataSet();
            sda.Fill(ds, "PurchaseOrderFinishMainReportDataSet");
            return ds;
        }
        public PurchaseOrderFinishDetReportDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderFinishInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderFinishDetReportDataSet ds = new PurchaseOrderFinishDetReportDataSet();
            sda.Fill(ds, "PurchaseOrderFinishDetReportDataSet");
            return ds;
        }

        public PurchaseOrderFinishGstReportDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderFinishGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderFinishGstReportDataSet ds = new PurchaseOrderFinishGstReportDataSet();
            sda.Fill(ds, "PurchaseOrderFinishGstReportDataSet");
            return ds;
        }
        public PurchaseOrderFinishAddlessReportDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderFinishAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderFinishAddlessReportDataSet ds = new PurchaseOrderFinishAddlessReportDataSet();
            sda.Fill(ds, "PurchaseOrderFinishAddlessReportDataSet");
            return ds;
        }
    }
}