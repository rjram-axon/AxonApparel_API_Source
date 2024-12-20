﻿using Microsoft.Reporting.WebForms;
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

namespace AxonApparels.Reports.Stores
{
    public partial class PurchaseOrderTracking : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PurchaseOrderTracking.rdlc");
                PurchaseOrderTrackingDataSet dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("PurchaseOrderTrackingStatement", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }

        }
        public PurchaseOrderTrackingDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurchseorderTrack", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            //{
            cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            //}
            /// if (Request.QueryString["OrderNo"] != "--Select OrderNo--")
            //{
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
            // }
            //// if (Request.QueryString["RefNo"] != "--Select RefNo--")
            // {
            cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["RefNo"].ToString();
            // }
            // if (Convert.ToInt32(Request.QueryString["StyID"]) > 0)
            // {
            cmd.Parameters.Add("@StyleId", SqlDbType.Int).Value = Request.QueryString["StyID"];
            // }
            // if (Convert.ToInt32(Request.QueryString["SuppID"]) > 0)
            // {
            cmd.Parameters.Add("@SuppId", SqlDbType.Int).Value = Request.QueryString["SuppID"];
            // }

            // if (Request.QueryString["PoNo"] != "--Select PoNo--")
            //  {
            cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 50).Value = Request.QueryString["PoNo"].ToString();
            // }

            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();

            //if (Request.QueryString["OType"] != "0")
            //{
            cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();
            //}
            // if (Request.QueryString["POType"] != "0")
            //{
            cmd.Parameters.Add("@ItemType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();
            //}
            // if (Request.QueryString["LType"] != "0")
            // {
            cmd.Parameters.Add("@LorImp", SqlDbType.VarChar, 50).Value = Request.QueryString["LType"].ToString();
            // }
            cmd.Parameters.Add("@RecNo", SqlDbType.VarChar, 50).Value = Request.QueryString["Recno"].ToString();
            cmd.Parameters.Add("@Process", SqlDbType.VarChar, 50).Value = Request.QueryString["process"].ToString();
            cmd.Parameters.Add("@DeliId", SqlDbType.Int).Value = Request.QueryString["Deli"];
            cmd.Parameters.Add("@ItemId", SqlDbType.Int).Value = Request.QueryString["itemid"];
            cmd.Parameters.Add("@ColoridId", SqlDbType.Int).Value = Request.QueryString["colorid"];
            cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = Request.QueryString["sizeid"];
            sda.SelectCommand = cmd;
            PurchaseOrderTrackingDataSet ds = new PurchaseOrderTrackingDataSet();
            sda.Fill(ds, "PurchaseOrderTrackingDataSet");

            if (ds.Tables[1].Rows.Count > 0)
            {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        if (Convert.ToInt32(ds.Tables[1].Rows[i][20] )> 1) {
                            ds.Tables[1].Rows[i][12] = 0;
                        }
                        if (Convert.ToInt32(ds.Tables[1].Rows[i][22]) > 1) {
                            ds.Tables[1].Rows[i][9] = 0;
                        }
                    }
              
            }

            return ds;
        }
    }
}