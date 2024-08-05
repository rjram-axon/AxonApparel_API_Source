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

namespace AxonApparels.Reports.Process.ProcessIssRecTracking
{
    public partial class ProcessIssRptTrackingStatement : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessIssRecTracking/ProcessIssRptTrackingStatement.rdlc");
                ProIssRptTrackDataSet ds = GetData();
                //ProcessIssueReceiptTrackDataSet ds1 = GetData1();

                ReportDataSource datasource = new ReportDataSource("ProIssRptTrackStatement", ds.Tables[1]);
                //ReportDataSource datasource1 = new ReportDataSource("ProcessIssueReceiptTrackStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                //ReportViewer1.LocalReport.DataSources.Add(datasource1);      
            }
        }

        public ProIssRptTrackDataSet GetData()
        {
             string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {
                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssRecptTrackStatement", con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
                cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
                cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];
                sda.SelectCommand = cmd;
                ProIssRptTrackDataSet ds = new ProIssRptTrackDataSet();
                sda.Fill(ds, "ProIssRptTrackDataSet");
                return ds;
            }
            else {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssRecptTrackStatementAudit", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandTimeout = 300;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
                cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
                cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];
                sda.SelectCommand = cmd;
                ProIssRptTrackDataSet ds = new ProIssRptTrackDataSet();
                sda.Fill(ds, "ProIssRptTrackDataSet");
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

        //public ProcessIssueReceiptTrackDataSet GetData1()
        //{
        //    string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
        //    con = new SqlConnection(conString);
        //    SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessIssRecptTrackStatementDet", con);
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
        //    cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
        //    cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
        //    cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
        //    cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
        //    cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
        //    cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
        //    cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
        //    cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
        //    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];
        //    sda.SelectCommand = cmd;
        //    ProcessIssueReceiptTrackDataSet ds = new ProcessIssueReceiptTrackDataSet();
        //    sda.Fill(ds, "ProcessIssueReceiptTrackDataSet");
        //    return ds;
        //}


    }
}