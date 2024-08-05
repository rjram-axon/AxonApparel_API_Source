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

namespace AxonApparels.Reports.Process.ProcessReceipt
{
    public partial class ProcessReceiptReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessReceipt/ProcessReceiptReport.rdlc");
                ProcessReceiptDetailDataset ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ProcessGRNDetailDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("ProcessReceiptDetailStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessGRNDetailStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
            }
        }

        public ProcessReceiptDetailDataset GetData()
        {

             string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptDetailStatement", con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter sda = new SqlDataAdapter();              
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];

                //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
                //{
                //    cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
                //}
                //if (Convert.ToInt32(Request.QueryString["SupplierID"]) > 0)
                //{
                //    cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
                //}
                //if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
                //{
                //    cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
                //}
                //if (Convert.ToInt32(Request.QueryString["ColorID"]) > 0)
                //{
                //    cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
                //}
                //if (Request.QueryString["OrderNo"] != "--Select OrderNo--")
                //{
                //    cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
                //}
                //if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
                //{
                //    cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
                //}
                //if (Request.QueryString["OrderType"] != "0")
                //{
                //    cmd.Parameters.Add("@OrderType", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderType"].ToString();
                //}
                //cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
                //cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
                sda.SelectCommand = cmd;
                ProcessReceiptDetailDataset ds = new ProcessReceiptDetailDataset();
                sda.Fill(ds, "ProcessReceiptDetailDataset");
                return ds;
            }
            else {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReceiptDetailStatementAudit", con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
                
                sda.SelectCommand = cmd;
                ProcessReceiptDetailDataset ds = new ProcessReceiptDetailDataset();
                sda.Fill(ds, "ProcessReceiptDetailDataset");
                return ds;
            
            }
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


        public ProcessGRNDetailDataSet GetData2()
        {

            string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessGRNdetails", con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];

              
                sda.SelectCommand = cmd;
                ProcessGRNDetailDataSet ds = new ProcessGRNDetailDataSet();
                sda.Fill(ds, "ProcessGRNDetailDataSet");
                return ds;
            }
            else
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessGRNdetailsAudit", con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["Procid"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];

                sda.SelectCommand = cmd;
                ProcessGRNDetailDataSet ds = new ProcessGRNDetailDataSet();
                sda.Fill(ds, "ProcessGRNDetailDataSet");
                return ds;

            }
        }

        public String GetUserGroup()
        {

            string grp = "";
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetUserGroupName", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Userid", SqlDbType.Int).Value = Request.QueryString["Userid"].ToString();
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    grp = rdr["GroupName"].ToString();
                }
            }
            return grp;
        }

    }
}