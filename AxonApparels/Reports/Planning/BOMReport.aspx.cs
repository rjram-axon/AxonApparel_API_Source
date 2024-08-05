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

namespace AxonApparels.Reports.Planning
{
    public partial class BOMReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/BOMReport.rdlc");

                ReportParameter rp1 = new ReportParameter("fdate", Request.QueryString["fdate"].ToString());
                ReportParameter rp2 = new ReportParameter("tdate", Request.QueryString["tdate"].ToString());



                BOMdetDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("BOMdetStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("BOMCompanyDetailsStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 });
            }
        }

        public BOMdetDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BOMStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyID"];
            cmd.Parameters.Add("@OrderType", SqlDbType.VarChar, 20).Value = Request.QueryString["Ordtype"];
            cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["Refno"].ToString();
            cmd.Parameters.Add("@BuyRefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["BRefno"].ToString();
            cmd.Parameters.Add("@JobNo", SqlDbType.VarChar, 20).Value = Request.QueryString["JobOrdNo"];
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@Status", SqlDbType.VarChar, 20).Value = Request.QueryString["Statustype"];
            cmd.Parameters.Add("@DetorSum", SqlDbType.VarChar, 20).Value = "D";
            cmd.Parameters.Add("@Item_Type", SqlDbType.VarChar, 20).Value = Request.QueryString["Itmgrp"].ToString();
            cmd.Parameters.Add("@Itemgroupid", SqlDbType.VarChar, 50).Value = "";
            cmd.Parameters.Add("@Itemid", SqlDbType.VarChar, 20).Value = "";
            cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = 0;
            cmd.Parameters.Add("@SeasonID", SqlDbType.VarChar, 20).Value = Request.QueryString["Seasonid"];
            cmd.Parameters.Add("@DeptID", SqlDbType.VarChar, 20).Value = "";
            cmd.Parameters.Add("@DtFtype", SqlDbType.VarChar, 50).Value = Request.QueryString["Dttype"];
            cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["StyID"];

            sda.SelectCommand = cmd;
            BOMdetDataSet ds = new BOMdetDataSet();
            sda.Fill(ds, "BOMdetDataSet");
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