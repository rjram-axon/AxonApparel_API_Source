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
namespace AxonApparels.Reports.Process.DCMatching
{
    public partial class ProcessDcMatchStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/DCMatching/ProcessDcMatchStatementReport.rdlc");
                ProcessDcMatchDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessDcMatchStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public ProcessDcMatchDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessDcMatchingStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FDate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@TDate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@bmasid", SqlDbType.VarChar,50).Value = Request.QueryString["Masid"].ToString();
            cmd.Parameters.Add("@CompanyUnitId", SqlDbType.Int).Value = Request.QueryString["unitid"];
            cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
            cmd.Parameters.Add("@Refid", SqlDbType.VarChar,50).Value = Request.QueryString["Ref"].ToString();
            cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["itmid"];
            cmd.Parameters.Add("@clrid", SqlDbType.Int).Value = Request.QueryString["Color"];

            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();


            cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["Compid"];
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
            ProcessDcMatchDataSet ds = new ProcessDcMatchDataSet();
            sda.Fill(ds, "ProcessDcMatchDataSet");
            return ds;
        }
    }
}