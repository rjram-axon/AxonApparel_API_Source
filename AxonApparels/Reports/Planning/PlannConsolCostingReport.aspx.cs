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

namespace AxonApparels.Reports.Planning
{
    public partial class PlannConsolCostReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/PlannConsolCostingReport.rdlc");
                PlannConsolCostDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("PlannConsolCostStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }

        public PlannConsolCostDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannConsolCostingStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1800;
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["BuyID"];
            cmd.Parameters.Add("@ref_no", SqlDbType.VarChar, 50).Value = Request.QueryString["Refno"].ToString();
            cmd.Parameters.Add("@ord_no", SqlDbType.VarChar, 50).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@job_ord_no", SqlDbType.VarChar, 20).Value = Request.QueryString["JobOrdNo"].ToString();
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["StyID"];
            cmd.Parameters.Add("@OrderType", SqlDbType.Char,1).Value = Request.QueryString["OrdType"].ToString();
            cmd.Parameters.Add("@Despatch", SqlDbType.Char, 1).Value = Request.QueryString["Status"].ToString();
            sda.SelectCommand = cmd;
            PlannConsolCostDataSet ds = new PlannConsolCostDataSet();
            sda.Fill(ds, "PlannConsolCostDataSet");
            return ds;
        }
        public CompanyDetStatementDataSet GetData1()
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
    }
}