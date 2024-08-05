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

namespace AxonApparels.ReportInline.Purchase.PurchaseOrderInlineReport
{
    public partial class PurchaseOrderReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderInlineReport/PurchaseOrderReportInline.rdlc");


                ReportParameter rp1 = new ReportParameter("SecQty", Request.QueryString["SecQty"].ToString());
                ReportParameter rp2 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp3 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
                ReportParameter rp4 = new ReportParameter("Paydet", Request.QueryString["Paydet"].ToString());
                ReportParameter rp5 = new ReportParameter("Baseqty", Request.QueryString["Baseqty"].ToString());
                ReportParameter rp6 = new ReportParameter("Annexure", Request.QueryString["Annexure"].ToString());

                ReportParameter rp7 = new ReportParameter("Splitup", Request.QueryString["Splitup"].ToString());
                ReportParameter rp8 = new ReportParameter("Terms", Request.QueryString["Terms"].ToString());
                ReportParameter rp9 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                ReportParameter rp10 = new ReportParameter("Mfr", Request.QueryString["Mfr"].ToString());
                ReportParameter rp11 = new ReportParameter("Itmcode", Request.QueryString["Itmcode"].ToString());
                ReportParameter rp12 = new ReportParameter("Refno", Request.QueryString["Refno"].ToString());


                ReportParameter rp13 = new ReportParameter("Barcode", Request.QueryString["Barcode"].ToString());
                ReportParameter rp14 = new ReportParameter("Reqdate", Request.QueryString["Reqdate"].ToString());
                ReportParameter rp15 = new ReportParameter("Gst", Request.QueryString["Gst"].ToString());
                ReportParameter rp16 = new ReportParameter("Original", Request.QueryString["Original"].ToString());
                ReportParameter rp17 = new ReportParameter("Duplicate", Request.QueryString["Duplicate"].ToString());
                ReportParameter rp18 = new ReportParameter("Triplicate", Request.QueryString["Triplicate"].ToString());

                ReportParameter rp19 = new ReportParameter("Merchcpy", Request.QueryString["Merchcpy"].ToString());
                ReportParameter rp20 = new ReportParameter("Mdcpy", Request.QueryString["Mdcpy"].ToString());
                ReportParameter rp21 = new ReportParameter("RptOpt", Request.QueryString["RptOpt"].ToString());

                PurchaseOrderDetailDataSet ds = GetData();
                PurchaseOrderTermsDataSet ds1 = GetData1();
                //PurOrdAddlessInlineDatatSet ds2 = GetData2();
                PurchaseOrderMainDataSet ds3 = GetData3();
                PurchaseOrderHeaderDataSet ds4 = GetData4();
                PurchaseOrderDetailGstDataSet ds5 = GetData5();
                PurchaseOrderYarnInlineAddLessDataSet ds6 = GetData6();
                ReportDataSource datasource = new ReportDataSource("PurchaseOrderDetailStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseOrderTermsStatement", ds1.Tables[1]);
                //ReportDataSource datasource2 = new ReportDataSource("PurOrdAddlessInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseOrderMainStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PurchaseOrderHeaderStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PurchaseOrderDetailGstStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("PurchaseOrderYarnInlineAddLessStatement", ds6.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                //ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20,rp21 });
            }
        }
        public PurchaseOrderDetailDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderDetailDataSet ds = new PurchaseOrderDetailDataSet();
            sda.Fill(ds, "PurchaseOrderDetailDataSet");
            return ds;
        }
        public PurchaseOrderTermsDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdTermsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderTermsDataSet ds = new PurchaseOrderTermsDataSet();
            sda.Fill(ds, "PurchaseOrderTermsDataSet");
            return ds;
        }
        //public PurOrdAddlessInlineDatatSet GetData2()
        //{
        //    string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
        //    con = new SqlConnection(conString);
        //    SqlCommand cmd = new SqlCommand("Proc_Apparel_PuraddlessInline", con);
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

        //    sda.SelectCommand = cmd;
        //    PurOrdAddlessInlineDatatSet ds = new PurOrdAddlessInlineDatatSet();
        //    sda.Fill(ds, "PurOrdAddlessInlineDatatSet");
        //    return ds;
        //}
        public PurchaseOrderMainDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdmainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderMainDataSet ds = new PurchaseOrderMainDataSet();
            sda.Fill(ds, "PurchaseOrderMainDataSet");
            return ds;
        }

        public PurchaseOrderHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["PurOrdId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PURCHASE ORDER";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            PurchaseOrderHeaderDataSet ds = new PurchaseOrderHeaderDataSet();
            sda.Fill(ds, "PurchaseOrderHeaderDataSet");
            return ds;
        }
        public PurchaseOrderDetailGstDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderDetailGstDataSet ds = new PurchaseOrderDetailGstDataSet();
            sda.Fill(ds, "PurchaseOrderDetailGstDataSet");
            return ds;
        }
        public PurchaseOrderYarnInlineAddLessDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderYarnInlineAddLessDataSet ds = new PurchaseOrderYarnInlineAddLessDataSet();
            sda.Fill(ds, "PurchaseOrderYarnInlineAddLessDataSet");
            return ds;
        }
    }

}