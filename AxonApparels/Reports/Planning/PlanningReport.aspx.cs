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
    public partial class PlanningReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Planning/PlanningReport.rdlc");
                ReportParameter rp1 = new ReportParameter("Process", Request.QueryString["process"].ToString());
                ReportParameter rp2 = new ReportParameter("Production", Request.QueryString["Production"].ToString());
                ReportParameter rp3 = new ReportParameter("Trims", Request.QueryString["trims"].ToString());
                ReportParameter rp4 = new ReportParameter("Fabric", Request.QueryString["yarn"].ToString());


                PlanningStyleDataset ds = GetData();
                PlanningItemtypeDataset ds1 = GetData1();
                CompanyDetStatementDataSet ds2 = GetData2();
                PlanningPrgDetailsDataSet ds3 = GetData3();
                PlanningPrgSummDetailsDataSet ds4 = GetData4();
                PlanningReport2DataSet ds5 = GetData5();
                ReportDataSource datasource = new ReportDataSource("PlanningStyleStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningItemtypeStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CompanyDetStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanningPrgDetailsStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PlanningPrgSummDetailsStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PlanningReport2Statement", ds5.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4 });
            }
        }
        public PlanningStyleDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_Planningstyleitems", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@StyRwid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();

            sda.SelectCommand = cmd;
            PlanningStyleDataset ds = new PlanningStyleDataset();
            sda.Fill(ds, "PlanningStyleDataset");
            return ds;
        }

        public PlanningItemtypeDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_Planningitemtype", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@StyRwid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Itemtype", SqlDbType.VarChar, 50).Value = Request.QueryString["itmtype"].ToString();
            //cmd.Parameters.Add("@Processid", SqlDbType.VarChar, 50).Value = Request.QueryString["Process"].ToString();
            //cmd.Parameters.Add("@Trims", SqlDbType.VarChar, 50).Value = Request.QueryString["trims"].ToString();
            //cmd.Parameters.Add("@Yarn", SqlDbType.VarChar, 50).Value = Request.QueryString["yarn"].ToString();
            //cmd.Parameters.Add("@Process", SqlDbType.VarChar, 50).Value = Request.QueryString["process"].ToString();
            //cmd.Parameters.Add("@Production", SqlDbType.VarChar, 50).Value = Request.QueryString["Production"].ToString();

            sda.SelectCommand = cmd;
            PlanningItemtypeDataset ds = new PlanningItemtypeDataset();
            sda.Fill(ds, "PlanningItemtypeDataset");
            return ds;
        }
        public CompanyDetStatementDataSet GetData2()
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
        public PlanningPrgDetailsDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_Planningstyleprgprocessdetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@StyRwid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();    

            sda.SelectCommand = cmd;
            PlanningPrgDetailsDataSet ds = new PlanningPrgDetailsDataSet();
            sda.Fill(ds, "PlanningPrgDetailsDataSet");
            return ds;
        }
        public PlanningPrgSummDetailsDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_Planningstyleprgdetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@StyRwid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@PType", SqlDbType.VarChar, 50).Value = Request.QueryString["prctype"].ToString();
            sda.SelectCommand = cmd;
            PlanningPrgSummDetailsDataSet ds = new PlanningPrgSummDetailsDataSet();
            sda.Fill(ds, "PlanningPrgSummDetailsDataSet");
            return ds;
        }

        public PlanningReport2DataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanningReport2", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;

            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();

            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
            cmd.Parameters.Add("@StyRwid", SqlDbType.VarChar, 50).Value = Request.QueryString["BOrdID"].ToString();
            cmd.Parameters.Add("@Itemtype", SqlDbType.VarChar, 50).Value = Request.QueryString["itmtype"].ToString();
            cmd.Parameters.Add("@Processid", SqlDbType.VarChar, 50).Value = Request.QueryString["processid"].ToString();
            cmd.Parameters.Add("@Trims", SqlDbType.VarChar, 50).Value = Request.QueryString["trims"].ToString();
            cmd.Parameters.Add("@Yarn", SqlDbType.VarChar, 50).Value = Request.QueryString["yarn"].ToString();
            cmd.Parameters.Add("@Process", SqlDbType.VarChar, 50).Value = Request.QueryString["process"].ToString();
            cmd.Parameters.Add("@Production", SqlDbType.VarChar, 50).Value = Request.QueryString["Production"].ToString();

            sda.SelectCommand = cmd;
            PlanningReport2DataSet ds = new PlanningReport2DataSet();
            sda.Fill(ds, "PlanningReport2DataSet");
            return ds;
        }

    }
}