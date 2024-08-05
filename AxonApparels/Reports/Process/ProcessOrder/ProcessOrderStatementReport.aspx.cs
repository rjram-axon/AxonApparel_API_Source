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
namespace AxonApparels.Reports.Process.ProcessOrder
{
    public partial class ProcessOrderStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessOrder/ProcessOrderStatementReport.rdlc");
                ProcessOrderDataSet ds = GetData();
                ReportParameter rp1 = new ReportParameter("OrderType", Request.QueryString["Ordtype"].ToString());
                ReportParameter rp2 = new ReportParameter("Masid", Request.QueryString["Masid"].ToString());
                ReportDataSource datasource = new ReportDataSource("ProcessOrderStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2});
            }
        }

        public ProcessOrderDataSet GetData()
        {

             string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderStatement", con);
                cmd.CommandTimeout = 600;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
                cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
                cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];

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
                ProcessOrderDataSet ds = new ProcessOrderDataSet();
                sda.Fill(ds, "ProcessOrderDataSet");
                return ds;
            }
            else {
                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderStatementAudit", con);
                cmd.CommandTimeout = 600;
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@bmasid", SqlDbType.VarChar, 50).Value = Request.QueryString["Masid"].ToString();
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["unitid"];
                cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["Itmid"];
                cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["Ref"].ToString();
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["Buyid"];
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["Color"];
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["Size"];
                cmd.Parameters.Add("@jmasid", SqlDbType.Int).Value = Request.QueryString["Jobid"];
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();

                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["Compid"];
                cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["suppid"];
                cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["processid"];

                
                sda.SelectCommand = cmd;
                ProcessOrderDataSet ds = new ProcessOrderDataSet();
                sda.Fill(ds, "ProcessOrderDataSet");
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