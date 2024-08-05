using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;
using System.Data;
using System.Configuration;

namespace AxonApparels.ReportInline.Planning.FabricProgram
{
    public partial class FabricProgramInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/FabricProgram/FabricProgramInlineReport.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;

                FabProgramSummaryMDataSet ds = GetData();
                FabProgramSummaryDDataSet ds1 = GetData1();
                FabProgramSummaryYDataSet ds2 = GetData2();

                ReportDataSource datasource = new ReportDataSource("FabProgramSummaryMStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("FabProgramSummaryDStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("FabProgramSummaryYStatement", ds2.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);

            }
        }
        public FabProgramSummaryMDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabProgramSummaryM", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Order_no", SqlDbType.NVarChar).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["styleid"].ToString();
            sda.SelectCommand = cmd;
            FabProgramSummaryMDataSet ds = new FabProgramSummaryMDataSet();
            sda.Fill(ds, "FabProgramSummaryMDataSet");
            return ds;
        }
        public FabProgramSummaryDDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabProgramSummaryD", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Order_no", SqlDbType.NVarChar).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["styleid"].ToString();
            sda.SelectCommand = cmd;
            FabProgramSummaryDDataSet ds = new FabProgramSummaryDDataSet();
            sda.Fill(ds, "FabProgramSummaryDDataSet");
            return ds;
        }
        public FabProgramSummaryYDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_FabProgramSummaryY", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Order_no", SqlDbType.NVarChar).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["styleid"].ToString();
            sda.SelectCommand = cmd;
            FabProgramSummaryYDataSet ds = new FabProgramSummaryYDataSet();
            sda.Fill(ds, "FabProgramSummaryYDataSet");
            return ds;
        }
    }
}