﻿using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AxonApparels.Reports.Stores
{
    public partial class BuyerOrderVsDespatch : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        string SupplierId = string.Empty;
        string txtFromDate = string.Empty;
        string txtToDate = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/BuyerOrderVsDespatch.rdlc");
                BuyerOrdVsDespatchDataSet dsCustomers = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("BuyerOrdVsDespatchStatement", dsCustomers.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }


        public BuyerOrdVsDespatchDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrdQtyVsDespatchQtyStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            {
                cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            }
            if (Convert.ToInt32(Request.QueryString["ItmID"]) > 0)
            {
                cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItmID"];
            }
            if (Convert.ToInt32(Request.QueryString["SizeID"]) > 0)
            {
                cmd.Parameters.Add("@SizeID", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["ColorID"]) > 0)
            {
                cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
            }
            if (Request.QueryString["Refno"] != "--Select Ref No--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["Refno"].ToString();
            }
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            BuyerOrdVsDespatchDataSet ds = new BuyerOrdVsDespatchDataSet();
            sda.Fill(ds, "BuyerOrdVsDespatchDataSet");
            return ds;
        }
        public CompanyDetStatementDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];

            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }
    }
}