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
    public partial class PlannDetailCostingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/PlannDetailCostingReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Type", Request.QueryString["Type"].ToString());
                ReportParameter rp2 = new ReportParameter("CmpID", Request.QueryString["Compid"].ToString());
                ReportParameter rp3 = new ReportParameter("Stock", Request.QueryString["Stock"].ToString());
                PlannDetCostDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                PlanDetCostMainDataSet ds2 = GetData2();
                PlanDetCostCostSummDataSet ds3 = GetData3();
                DetailCostingSalesSummaryDataSet ds4 = GetData4();
                StockInhandDataSet ds5 = GetData5();
                ReportDataSource datasource = new ReportDataSource("PlannDetCostStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanDetCostMainStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanDetCostCostSummStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("DetailCostingSalesSummaryStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("StockInhandStatement", ds5.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3 });
            }
        }

        public PlannDetCostDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannDetailCostingStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            sda.SelectCommand = cmd;
            PlannDetCostDataSet ds = new PlannDetCostDataSet();
            sda.Fill(ds, "PlannDetCostDataSet");


            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["ItemGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][5] = "";
                    }
                }
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
        public PlanDetCostMainDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannDetailCostingMainStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            sda.SelectCommand = cmd;
            PlanDetCostMainDataSet ds = new PlanDetCostMainDataSet();
            sda.Fill(ds, "PlanDetCostMainDataSet");
            return ds;
        }
        public PlanDetCostCostSummDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannDetailCostingCostSummaryStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            sda.SelectCommand = cmd;
            PlanDetCostCostSummDataSet ds = new PlanDetCostCostSummDataSet();
            sda.Fill(ds, "PlanDetCostCostSummDataSet");
            return ds;
        }
        public DetailCostingSalesSummaryDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlannDetailCostingCostSalesSummaryStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            sda.SelectCommand = cmd;
            DetailCostingSalesSummaryDataSet ds = new DetailCostingSalesSummaryDataSet();            
            sda.Fill(ds, "DetailCostingSalesSummaryDataSet");
            return ds;
        }
        public StockInhandDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStockDetailsforCostingReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
      
            cmd.Parameters.Add("@Bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            sda.SelectCommand = cmd;
            StockInhandDataSet ds = new StockInhandDataSet();
            sda.Fill(ds, "StockInhandDataSet");
            return ds;
        }
    }
}