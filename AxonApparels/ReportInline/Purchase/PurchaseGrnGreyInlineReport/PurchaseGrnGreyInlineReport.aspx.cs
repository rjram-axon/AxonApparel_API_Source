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

namespace AxonApparels.ReportInline.Purchase.PurchaseGrnGreyInlineReport
{
    public partial class PurchaseGrnGreyInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseGrnGreyInlineReport/PurchaseGrnGreyReportInline.rdlc");


                PurchaseGrnGreyMainInlineDataSet ds = GetData();
                PurchaseGrnGreyDetInlineDataSet ds1 = GetData1();
                PurchaseGrnGreyAddlessInlineDataSet ds2 = GetData2();
                PurchaseGrnGreyGstInlineDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("PurchaseGrnGreyMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseGrnGreyDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseGrnGreyAddlessInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseGrnGreyGstInlineStatement", ds3.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

            }
        }
        public PurchaseGrnGreyMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnGreyMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnGreyMainInlineDataSet ds = new PurchaseGrnGreyMainInlineDataSet();
            sda.Fill(ds, "PurchaseGrnGreyMainInlineDataSet");
            return ds;
        }
        public PurchaseGrnGreyDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnGreyInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnGreyDetInlineDataSet ds = new PurchaseGrnGreyDetInlineDataSet();
            sda.Fill(ds, "PurchaseGrnGreyDetInlineDataSet");
            return ds;
        }

        public PurchaseGrnGreyAddlessInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnGreyAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnGreyAddlessInlineDataSet ds = new PurchaseGrnGreyAddlessInlineDataSet();
            sda.Fill(ds, "PurchaseGrnGreyAddlessInlineDataSet");
            return ds;
        }
        public PurchaseGrnGreyGstInlineDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnGreyGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnGreyGstInlineDataSet ds = new PurchaseGrnGreyGstInlineDataSet();
            sda.Fill(ds, "PurchaseGrnGreyGstInlineDataSet");
            return ds;
        }
    }
}