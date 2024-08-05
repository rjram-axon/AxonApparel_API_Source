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

namespace AxonApparels.Reports.Process.ProcessOutstanding
{
    public partial class ProcessOutstandingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlConnection con1;
        SqlCommand cmd1;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessOutstanding/ProcessOutstandingReport.rdlc");
                //ProcessOutstandingInsertDataSet ds = GetData();
                ProcessOutstandingDetailDataSet ds1 = GetData1();
                //ReportDataSource datasource = new ReportDataSource("ProcessOutstandingInsertStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessOutstandingDetailStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                //ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
            }
        }
        //public ProcessOutstandingInsertDataSet GetData()
        //{
        //    string conString1 = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
        //    con1 = new SqlConnection(conString1);
        //    SqlCommand cmd1 = new SqlCommand("Proc_Apparel_GetOutstandingInsert", con1);
        //    SqlDataAdapter sda1 = new SqlDataAdapter();
        //    cmd1.CommandType = CommandType.StoredProcedure;
        //    //cmd1.Parameters.Add("@Processortype", SqlDbType.VarChar, 10).Value = Request.QueryString["processortype"];
        //    cmd1.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
        //    cmd1.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Processid"];
        //    cmd1.Parameters.Add("@ProcessorId", SqlDbType.Int).Value = Request.QueryString["Processorid"];
        //    cmd1.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
        //    cmd1.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
        //    cmd1.Parameters.Add("@Ref_no", SqlDbType.VarChar, 20).Value = Request.QueryString["Refno"].ToString();
        //    cmd1.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["fdate"].ToString();
        //    cmd1.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["tdate"].ToString();
        //    sda1.SelectCommand = cmd1;
        //    ProcessOutstandingInsertDataSet ds = new ProcessOutstandingInsertDataSet();
        //    sda1.Fill(ds, "ProcessOutstandingInsertDataSet");
        //    return ds;
        //}
        public ProcessOutstandingDetailDataSet GetData1()
        {
            //string conString1 = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            //con1 = new SqlConnection(conString1);
            //SqlCommand cmd1 = new SqlCommand("Proc_Apparel_GetOutstandingInsert", con1);
            //SqlDataAdapter sda1 = new SqlDataAdapter();
            //cmd1.CommandType = CommandType.StoredProcedure;
            //cmd1.Parameters.Add("@Processortype", SqlDbType.VarChar, 10).Value = Request.QueryString["processortype"];
            //cmd1.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            //cmd1.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Processid"];
            //cmd1.Parameters.Add("@ProcessorId", SqlDbType.Int).Value = Request.QueryString["Processorid"];
            //cmd1.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            //cmd1.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
            //cmd1.Parameters.Add("@Ref_no", SqlDbType.VarChar, 20).Value = Request.QueryString["Refno"].ToString();
            //cmd1.Parameters.Add("@FromDate", SqlDbType.VarChar, 25).Value = Request.QueryString["fdate"].ToString();
            //cmd1.Parameters.Add("@ToDate", SqlDbType.VarChar, 25).Value = Request.QueryString["tdate"].ToString();
            //sda1.SelectCommand = cmd1;
            ////string conString1 = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            ////con1 = new SqlConnection(conString1);
            ////SqlCommand cmd1 = new SqlCommand("Proc_Apparel_GetOutstandingInsert", con1);
            ////SqlDataAdapter sda1 = new SqlDataAdapter();
            ////cmd1.CommandType = CommandType.StoredProcedure;
            //////cmd1.Parameters.Add("@Processortype", SqlDbType.VarChar, 10).Value = Request.QueryString["processortype"];
            ////cmd1.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            ////cmd1.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Processid"];
            ////cmd1.Parameters.Add("@ProcessorId", SqlDbType.Int).Value = Request.QueryString["Processorid"];
            ////cmd1.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            ////cmd1.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
            ////cmd1.Parameters.Add("@Ref_no", SqlDbType.VarChar, 20).Value = Request.QueryString["Refno"].ToString();
            ////cmd1.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["fdate"].ToString();
            ////cmd1.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["tdate"].ToString();
            ////sda1.SelectCommand = cmd1;



            string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;

            SqlConnection cnn = new SqlConnection(cnnString);
            SqlCommand cmd1 = new SqlCommand();
            cmd1.Connection = cnn;
            cmd1.CommandType = System.Data.CommandType.StoredProcedure;
            cmd1.CommandText = "Proc_Apparel_GetOutstandingInsert";
            //add any parameters the stored procedure might require
            cmd1.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd1.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Processid"];
            cmd1.Parameters.Add("@ProcessorId", SqlDbType.Int).Value = Request.QueryString["Processorid"];
            cmd1.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["Styleid"];
            cmd1.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
            cmd1.Parameters.Add("@Ref_no", SqlDbType.VarChar, 100).Value = Request.QueryString["Refno"].ToString();
            cmd1.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["fdate"].ToString();
            cmd1.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["tdate"].ToString();
            cnn.Open();
            object o = cmd1.ExecuteScalar();
            cnn.Close();

            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOutstandingDetail", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@ProcessId", SqlDbType.Int).Value = Request.QueryString["Processid"];
            cmd.Parameters.Add("@ProcessorId", SqlDbType.Int).Value = Request.QueryString["Processorid"];
            cmd.Parameters.Add("@Style", SqlDbType.VarChar, 50).Value = Request.QueryString["Styleid"].ToString();
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@Ref_no", SqlDbType.VarChar, 100).Value = Request.QueryString["Refno"].ToString();
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 25).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 25).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();

            sda.SelectCommand = cmd;
            ProcessOutstandingDetailDataSet ds = new ProcessOutstandingDetailDataSet();
            sda.Fill(ds, "ProcessOutstandingDetailDataSet");
            return ds;
        }
    }
}