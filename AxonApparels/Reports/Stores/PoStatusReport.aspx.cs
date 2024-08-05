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

namespace AxonApparels.Reports
{
    public partial class PoStatusReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PoStatusReport.rdlc");
                PoStatusDataset dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("PoStatusStatement", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public PoStatusDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PoStatus", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            //{
                cmd.Parameters.Add("@CompanyId", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            //}
           /// if (Request.QueryString["OrderNo"] != "--Select OrderNo--")
            //{
                cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
           // }
           //// if (Request.QueryString["RefNo"] != "--Select RefNo--")
           // {
               cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["RefNo"].ToString();
           // }
           // if (Convert.ToInt32(Request.QueryString["StyID"]) > 0)
           // {
                cmd.Parameters.Add("@StyleId", SqlDbType.Int).Value = Request.QueryString["StyID"];
           // }
           // if (Convert.ToInt32(Request.QueryString["SuppID"]) > 0)
           // {
                cmd.Parameters.Add("@SuppId", SqlDbType.Int).Value = Request.QueryString["SuppID"];
           // }

           // if (Request.QueryString["PoNo"] != "--Select PoNo--")
          //  {
                cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 50).Value = Request.QueryString["PoNo"].ToString();
           // }
          
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();

            //if (Request.QueryString["OType"] != "0")
            //{
                cmd.Parameters.Add("@OType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();
            //}
           // if (Request.QueryString["POType"] != "0")
            //{
                cmd.Parameters.Add("@ItemType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();
            //}
           // if (Request.QueryString["LType"] != "0")
           // {
                cmd.Parameters.Add("@LorImp", SqlDbType.VarChar, 50).Value = Request.QueryString["LType"].ToString();
           // }
            sda.SelectCommand = cmd;
            PoStatusDataset ds = new PoStatusDataset();
            sda.Fill(ds, "PoStatusDataset");
            return ds;
        }
    }
}