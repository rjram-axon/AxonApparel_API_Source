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

namespace AxonApparels.ReportInline.Purchase.PurchaseGrnFinishInlineReport
{
    public partial class PurchaseGrnFinishInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseGrnFinishInlineReport/PurchaseGrnFinishReportInline.rdlc");


                PurchaseGrnFinMainInlineDataSet ds = GetData();
                PurchaseGrnFinDetInlineDataSet ds1 = GetData1();
                PurchaseGrnFinAddlessInlineDataSet ds2 = GetData2();
                PurchaseGrnFinGstInlineDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("PurchaseGrnFinMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseGrnFinDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseGrnFinAddlessInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseGrnFinGstInlineStatement", ds3.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

            }
        }
        public PurchaseGrnFinMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnFinMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnFinMainInlineDataSet ds = new PurchaseGrnFinMainInlineDataSet();
            sda.Fill(ds, "PurchaseGrnFinMainInlineDataSet");
            return ds;
        }
        public PurchaseGrnFinDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnFinInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnFinDetInlineDataSet ds = new PurchaseGrnFinDetInlineDataSet();
            sda.Fill(ds, "PurchaseGrnFinDetInlineDataSet");
            return ds;
        }

        public PurchaseGrnFinAddlessInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnFinAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnFinAddlessInlineDataSet ds = new PurchaseGrnFinAddlessInlineDataSet();
            sda.Fill(ds, "PurchaseGrnFinAddlessInlineDataSet");
            return ds;
        }
        public PurchaseGrnFinGstInlineDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnFinGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnFinGstInlineDataSet ds = new PurchaseGrnFinGstInlineDataSet();
            sda.Fill(ds, "PurchaseGrnFinGstInlineDataSet");
            return ds;
        }
    }
}