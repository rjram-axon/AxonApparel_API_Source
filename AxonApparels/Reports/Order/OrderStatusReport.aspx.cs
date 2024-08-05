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
namespace AxonApparels.Reports
{
    public partial class OrderStatusReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Order/OrderStatusReport.rdlc");

                ReportParameter rp1 = new ReportParameter("orderchecked", Request.QueryString["orderchecked"].ToString());
                ReportParameter rp2 = new ReportParameter("bomchecked", Request.QueryString["bomchecked"].ToString());
                ReportParameter rp3 = new ReportParameter("procprodchecked", Request.QueryString["procprodchecked"].ToString());
                ReportParameter rp4 = new ReportParameter("despchecked", Request.QueryString["despchecked"].ToString());
                ReportParameter rp5 = new ReportParameter("BuyerID", Request.QueryString["BuyerID"].ToString());
                ReportParameter rp6 = new ReportParameter("prodchecked", Request.QueryString["prodchecked"].ToString());
                ReportParameter rp7 = new ReportParameter("Stocktranschecked", Request.QueryString["Stocktranschecked"].ToString());

                OrderStatusDataset ds = GetData();
                OrderStatusDataSetUOM ds1 = GetData1();
                OrderStatusDatasetBOM ds2 = GetData2();
                OrderStatusDatasetItems ds3 = GetData3();
                OrderStatusDatasetProdDetails ds4 = GetData4();
                OrderStatusDatasetDesdetails ds5 = GetData5();
                Apparel_OrderStatusStockinandOutDataSet ds6 = GetData6();
                OrderStatusOpenStockDataSet ds7 = GetData7();
                ProcessStockStoreIssueDataSet ds8 = GetData8();

                ReportDataSource datasource1 = new ReportDataSource("OrderStatusStatement", ds.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("OrderStatusUOMStatement", ds1.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("OrderStatusBOMStatement", ds2.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("OrderStatusItemsStatement", ds3.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("OrderStatusProdDetailsStatement", ds4.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("OrderStatusDesDetailsStatement", ds5.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("OrderStatusStockinandOutStatement", ds6.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("OrderStatusOpenStockStatement", ds7.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("ProcessStockStoreIssueStatement", ds8.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.DataSources.Add(datasource7);
                ReportViewer1.LocalReport.DataSources.Add(datasource8);
                ReportViewer1.LocalReport.DataSources.Add(datasource9);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7 });

            }
        }

        public OrderStatusDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusSty_det", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDataset ds = new OrderStatusDataset();
            sda.Fill(ds, "OrderStatusDataset");
            return ds;
        }

        public OrderStatusDataSetUOM GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusUOM_Det", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDataSetUOM ds = new OrderStatusDataSetUOM();
            sda.Fill(ds, "OrderStatusDataSetUOM");
            return ds;
        }

        public OrderStatusDatasetBOM GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusBOM_Det", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar,100).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar,100).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
         
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDatasetBOM ds = new OrderStatusDatasetBOM();
            sda.Fill(ds, "OrderStatusDatasetBOM");

            if (ds.Tables[1].Rows.Count > 0)
            {
             
                if (Request.QueryString["ColorGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][6] = "";
                    }
                }
                if (Request.QueryString["SizeGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][7] = "";
                    }
                }
            }
                return ds;
        }

        public OrderStatusDatasetItems GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusitems_Det", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDatasetItems ds = new OrderStatusDatasetItems();
            sda.Fill(ds, "OrderStatusDatasetItems");
            return ds;
        }

        public OrderStatusDatasetProdDetails GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusProd_details", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDatasetProdDetails ds = new OrderStatusDatasetProdDetails();
            sda.Fill(ds, "OrderStatusDatasetProdDetails");


            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["ItemGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][20] = "";
                    }
                }
                if (Request.QueryString["ColorGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][21] = "";
                    }
                }
                if (Request.QueryString["SizeGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][22] = "";
                    }
                }
            }


            return ds;
        }

        public OrderStatusDatasetDesdetails GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusDes_details", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar,20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar,20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusDatasetDesdetails ds = new OrderStatusDatasetDesdetails();
            sda.Fill(ds, "OrderStatusDatasetDesdetails");
            return ds;
        }


        public Apparel_OrderStatusStockinandOutDataSet GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusStockinandOut", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }
            Apparel_OrderStatusStockinandOutDataSet ds = new Apparel_OrderStatusStockinandOutDataSet();
            sda.Fill(ds, "Apparel_OrderStatusStockinandOutDataSet");

            //if (ds.Tables[1].Rows.Count > 0)
            //{
            //    if (Request.QueryString["ItemGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][3] = "";
            //        }
            //    }
            //    if (Request.QueryString["ColorGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][3] = "";
            //        }
            //    }
            //    if (Request.QueryString["SizeGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][4] = "";
            //        }
            //    }
            //}


            return ds;
        }

        public OrderStatusOpenStockDataSet GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OrderStatusOpenStock", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }
            OrderStatusOpenStockDataSet ds = new OrderStatusOpenStockDataSet();
            sda.Fill(ds, "OrderStatusOpenStockDataSet");

            //if (ds.Tables[1].Rows.Count > 0)
            //{
            //    if (Request.QueryString["ItemGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][3] = "";
            //        }
            //    }
            //    if (Request.QueryString["ColorGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][3] = "";
            //        }
            //    }
            //    if (Request.QueryString["SizeGrp"].ToString() == "true")
            //    {
            //        for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            //        {
            //            ds.Tables[1].Rows[i][4] = "";
            //        }
            //    }
            //}
            return ds;
        }



        public ProcessStockStoreIssueDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetProcessStockStoreissueOrderStaus", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }
            ProcessStockStoreIssueDataSet ds = new ProcessStockStoreIssueDataSet();
            sda.Fill(ds, "ProcessStockStoreIssueDataSet");


            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["ItemGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][6] = "";
                    }
                }
                if (Request.QueryString["ColorGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][7] = "";
                    }
                }
                if (Request.QueryString["SizeGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][8] = "";
                    }
                }
            }


            return ds;
        }




    }
}