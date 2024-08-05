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
    public partial class PoCancelStatement : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PoCancelStamentReport.rdlc");
                PoCancelDataset dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("PoCancel", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }


        public PoCancelDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PoCancelStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
            cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            cmd.Parameters.Add("@Purord", SqlDbType.Int).Value = Request.QueryString["Purord"];
            cmd.Parameters.Add("@Buymasid", SqlDbType.VarChar, 50).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@Refid", SqlDbType.VarChar, 50).Value = Request.QueryString["refno"].ToString();
            cmd.Parameters.Add("@Itmid", SqlDbType.VarChar, 20).Value = Request.QueryString["itm"].ToString();
            cmd.Parameters.Add("@StyleID", SqlDbType.VarChar, 20).Value = Request.QueryString["styno"].ToString();
            cmd.Parameters.Add("@ItmType", SqlDbType.VarChar, 1).Value = Request.QueryString["Proctype"].ToString();
            cmd.Parameters.Add("@PurType", SqlDbType.VarChar, 1).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@LocImp", SqlDbType.VarChar, 1).Value = Request.QueryString["Loctype"].ToString();
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            PoCancelDataset ds = new PoCancelDataset();
            sda.Fill(ds, "PoCancelDataset");
            return ds;
        }
    }
}