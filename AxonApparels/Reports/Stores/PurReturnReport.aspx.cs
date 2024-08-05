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
    public partial class PurReturnReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/PurReturnReport.rdlc");
                PurReturnDataset dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("PurRetStatement", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public PurReturnDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurReturn", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
            {
                cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            }
            if (Convert.ToInt32(Request.QueryString["SupplierID"]) > 0)
            {
                cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
            }
            if (Convert.ToInt32(Request.QueryString["ItemID"]) > 0)
            {
                cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItemID"];
            }
            if (Convert.ToInt32(Request.QueryString["ColorID"]) > 0)
            {
                cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
            }
            if (Convert.ToInt32(Request.QueryString["SizeID"]) > 0)
            {
                cmd.Parameters.Add("@SizeID", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            }
            //cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            PurReturnDataset ds = new PurReturnDataset();
            sda.Fill(ds, "PurReturnDataset");
            return ds;
        }
    }
}