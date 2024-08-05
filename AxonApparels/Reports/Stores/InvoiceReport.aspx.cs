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
    public partial class InvoiceReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/InvoiceReport.rdlc");
                InvoiceDataset ds = GetData();
                ReportDataSource datasource = new ReportDataSource("InvoiceStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }

        public InvoiceDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_InvoiceReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
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
            //if (Request.QueryString["OrderNo"] != "--Select Order No--")
            //{
            //    cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
            //}
            //if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            //{
            //    cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
            //}
            //if (Convert.ToInt32(Request.QueryString["ItemID"]) > 0)
            //{
            //    cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItemID"];
            //}
            //if (Convert.ToInt32(Request.QueryString["SizeID"]) > 0)
            //{
            //    cmd.Parameters.Add("@SizeID", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            //}   
            //cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();


            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
            cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
            cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderNo"].ToString();
            cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
            cmd.Parameters.Add("@ItemID", SqlDbType.Int).Value = Request.QueryString["ItemID"];         
            cmd.Parameters.Add("@InvNo", SqlDbType.VarChar, 20).Value = Request.QueryString["InvcNo"].ToString();
            cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 100).Value = Request.QueryString["DcNo"].ToString();
            cmd.Parameters.Add("@OrdRefNo", SqlDbType.VarChar, 100).Value = Request.QueryString["OrdRefNo"].ToString();
            cmd.Parameters.Add("@PoNo", SqlDbType.VarChar, 20).Value = Request.QueryString["PoNo"].ToString();
            cmd.Parameters.Add("@OrdType", SqlDbType.VarChar, 50).Value = Request.QueryString["OType"].ToString();
            cmd.Parameters.Add("@PoType", SqlDbType.VarChar, 50).Value = Request.QueryString["POType"].ToString();
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();

            sda.SelectCommand = cmd;
            InvoiceDataset ds = new InvoiceDataset();
            sda.Fill(ds, "InvoiceDataset");
            return ds;
        }
    }
}