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
    
namespace AxonApparels.ReportInline.Production.Despatch
{
    public partial class DespatchInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/Despatch/DespatchInlineReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Size", Request.QueryString["Size"].ToString());
                ReportParameter rp2 = new ReportParameter("Color", Request.QueryString["Color"].ToString());
                DespatchInlineHeader ds = GetData();
                DespatchInlineHeaderDet ds1 = GetData1();
                DespatchInlineShipment ds2 = GetData2();
                DespatchInlineItem ds3 = GetData3();
                DespatchHeaderDataSet ds4 = GetData4();
                ReportDataSource datasource = new ReportDataSource("DespatchInlineHeader", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("DespatchInlineHeaderDet", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("DespatchInlineShipment", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("DespatchInlineItem", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("DespatchHeaderStatement", ds4.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 });
            }
        }

        public DespatchInlineHeader GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_DespatchInlineHeader", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@despatchid", SqlDbType.Int).Value = Request.QueryString["DespatchId"].ToString();
           
            sda.SelectCommand = cmd;
            DespatchInlineHeader ds = new DespatchInlineHeader();
            sda.Fill(ds, "DespatchInlineHeader");
            return ds;
        }

        public DespatchInlineHeaderDet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_DespatchInlineHeaderDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@despatchid", SqlDbType.Int).Value = Request.QueryString["DespatchId"].ToString();
           
            sda.SelectCommand = cmd;
            DespatchInlineHeaderDet ds = new DespatchInlineHeaderDet();
            sda.Fill(ds, "DespatchInlineHeaderDet");
            return ds;
        }

        public DespatchInlineShipment GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_DespatchInlineShipment", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@despatchid", SqlDbType.Int).Value = Request.QueryString["DespatchId"].ToString();
            
            sda.SelectCommand = cmd;
            DespatchInlineShipment ds = new DespatchInlineShipment();
            sda.Fill(ds, "DespatchInlineShipment");
            return ds;
        }

        public DespatchInlineItem GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_DespatchInlineItem", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@despatchid", SqlDbType.Int).Value = Request.QueryString["DespatchId"].ToString();
           
            sda.SelectCommand = cmd;
            DespatchInlineItem ds = new DespatchInlineItem();
            sda.Fill(ds, "DespatchInlineItem");
            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["Size"].ToString() == "0")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][2] = "";
                    }
                }

            }
            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["Color"].ToString() == "0")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][1] = "";
                    }
                }

            }
            return ds;
        }
        public DespatchHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["DespatchId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "BUYER ORDER DESPATCH";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            DespatchHeaderDataSet ds = new DespatchHeaderDataSet();
            sda.Fill(ds, "DespatchHeaderDataSet");
            return ds;
        }
    }
}