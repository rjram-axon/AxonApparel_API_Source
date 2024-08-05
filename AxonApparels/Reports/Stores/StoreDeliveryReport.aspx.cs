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
using Microsoft.Reporting.WebForms;

namespace AxonApparels.Reports.Stores
{
    public partial class StoreDeliveryReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StoreDeliveryReport.rdlc");

            //ReportParameter rp1 = new ReportParameter("ViweColor", Request.QueryString["ViweColor"].ToString());
            //ReportParameter rp2 = new ReportParameter("groupby", Request.QueryString["groupby"].ToString());
            //ReportParameter rp3 = new ReportParameter("Sewing", Request.QueryString["Sewing"].ToString());
            ////ReportParameter rp4 = new ReportParameter("despchecked", Request.QueryString["despchecked"].ToString());
            ////ReportParameter rp5 = new ReportParameter("BuyerID", Request.QueryString["BuyerID"].ToString());
            ////ReportParameter rp6 = new ReportParameter("prodchecked", Request.QueryString["prodchecked"].ToString());

            CompanyDetStatementDataSet ds = GetData();
            StoreDeliveryReportDataSet ds1 = GetData1();
            //OtherProcesReportStatement ds = GetData();

            //OrderStatusDataSetUOM ds1 = GetData1();
            //OrderInHandReportDatasetBOM ds2 = GetData2();
            //OrderInHandReportDatasetItems ds3 = GetData3();
            //OrderInHandReportDatasetProdDetails ds4 = GetData4();
            //OrderInHandReportDatasetDesdetails ds5 = GetData5();
            //Apparel_OrderStatusStockinandOutDataSet ds6 = GetData6();
            //OrderStatusOpenStockDataSet ds7 = GetData7();

            ReportDataSource datasource1 = new ReportDataSource("StoreDeliveryCompanyDetStatement", ds.Tables[1]);
            ReportDataSource datasource2 = new ReportDataSource("StoreDeliveryReportStatement", ds1.Tables[1]);
            //ReportDataSource datasource1 = new ReportDataSource("OtherProcesReportStatement", ds.Tables[1]);

            //ReportDataSource datasource2 = new ReportDataSource("OrderStatusUOMStatement", ds1.Tables[1]);
            //ReportDataSource datasource3 = new ReportDataSource("OrderStatusBOMStatement", ds2.Tables[1]);
            //ReportDataSource datasource4 = new ReportDataSource("OrderStatusItemsStatement", ds3.Tables[1]);
            //ReportDataSource datasource5 = new ReportDataSource("OrderStatusProdDetailsStatement", ds4.Tables[1]);
            //ReportDataSource datasource6 = new ReportDataSource("OrderStatusDesDetailsStatement", ds5.Tables[1]);
            //ReportDataSource datasource7 = new ReportDataSource("OrderStatusStockinandOutStatement", ds6.Tables[1]);
            //ReportDataSource datasource8 = new ReportDataSource("OrderStatusOpenStockStatement", ds7.Tables[1]);

            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource1);
            ReportViewer1.LocalReport.DataSources.Add(datasource2);
            //ReportViewer1.LocalReport.DataSources.Add(datasource2);
            //ReportViewer1.LocalReport.DataSources.Add(datasource3);
            //ReportViewer1.LocalReport.DataSources.Add(datasource4);
            //ReportViewer1.LocalReport.DataSources.Add(datasource5);
            //ReportViewer1.LocalReport.DataSources.Add(datasource6);
            //ReportViewer1.LocalReport.DataSources.Add(datasource7);
            //ReportViewer1.LocalReport.DataSources.Add(datasource8);
            /////   ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3 });
        }

        public CompanyDetStatementDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["Compid"];

            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }

        public StoreDeliveryReportDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreDeliveryReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }           

            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }

            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["ItemId"]) > 0)
            {
                cmd.Parameters.Add("@ItemId", SqlDbType.Int).Value = Request.QueryString["ItemId"];
            }

            if (Convert.ToInt32(Request.QueryString["SupplierId"]) > 0)
            {
                cmd.Parameters.Add("@SupplierId", SqlDbType.Int).Value = Request.QueryString["SupplierId"];
            }

            if (Request.QueryString["OType"] != "")
            {
                cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();
            }

            if (Request.QueryString["UType"] != "")
            {
                cmd.Parameters.Add("@UType", SqlDbType.VarChar, 50).Value = Request.QueryString["UType"].ToString();
            }

            if (Request.QueryString["IType"] != "")
            {
                cmd.Parameters.Add("@IType", SqlDbType.VarChar, 50).Value = Request.QueryString["IType"].ToString();
            }

            if (Request.QueryString["DSOType"] != "")
            {
                cmd.Parameters.Add("@DSOType", SqlDbType.VarChar, 50).Value = Request.QueryString["DSOType"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["DespatchLocId"]) > 0)
            {
                cmd.Parameters.Add("@DespatchLocId", SqlDbType.Int).Value = Request.QueryString["DespatchLocId"];
            }

            sda.SelectCommand = cmd;

            StoreDeliveryReportDataSet ds = new StoreDeliveryReportDataSet();
            sda.Fill(ds, "StoreDeliveryReportDataSet");

            return ds;
        }
    }
}