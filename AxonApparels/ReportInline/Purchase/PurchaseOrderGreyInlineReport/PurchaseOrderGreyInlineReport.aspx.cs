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

namespace AxonApparels.ReportInline.Purchase.PurchaseOrderGreyInlineReport
{
    public partial class PurchaseOrderGreyInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            

            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderGreyInlineReport/PurchaseOrderGreyReportInline.rdlc");


                PurchaseOrderGreyMainInlineDataSet ds = GetData();
                PurchaseOrderGreyInlineDetDataSet ds1 = GetData1();
                PurchaseOrderGreyInlineGstDataSet ds2 = GetData2();
                PurchaseOrderAddLessInlineGreyDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("PurchaseOrderGreyMainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseOrderGreyInlineDetStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseOrderGreyInlineGstStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseOrderAddLessInlineGreyStatement", ds3.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

            }

        }
        public PurchaseOrderGreyMainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdmainlistGreyInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderGreyMainInlineDataSet ds = new PurchaseOrderGreyMainInlineDataSet();
            sda.Fill(ds, "PurchaseOrderGreyMainInlineDataSet");
            return ds;
        }
        public PurchaseOrderGreyInlineDetDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGreyInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderGreyInlineDetDataSet ds = new PurchaseOrderGreyInlineDetDataSet();
            sda.Fill(ds, "PurchaseOrderGreyInlineDetDataSet");
            return ds;
        }

        public PurchaseOrderGreyInlineGstDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGreyGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderGreyInlineGstDataSet ds = new PurchaseOrderGreyInlineGstDataSet();
            sda.Fill(ds, "PurchaseOrderGreyInlineGstDataSet");
            return ds;
        }
        public PurchaseOrderAddLessInlineGreyDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGreyAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderAddLessInlineGreyDataSet ds = new PurchaseOrderAddLessInlineGreyDataSet();
            sda.Fill(ds, "PurchaseOrderAddLessInlineGreyDataSet");
            return ds;
        }
    }
}