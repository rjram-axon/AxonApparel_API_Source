using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AxonApparels.Reports.Stores
{
    public partial class StyleWisePOGRNInvoice : System.Web.UI.Page
    {

        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StyleWisePOGRNInvoice.rdlc");
                StyleWisePOGRNInvoiceDataSet ds = GetData();

                ReportDataSource datasource = new ReportDataSource("StyleWisePoGRNInvoiceStatement", ds.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                           
            }

        }
        public StyleWisePOGRNInvoiceDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStyleWisePOGRNInvoiceReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["OrderNo"] != null && Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@OrderNo", SqlDbType.Text).Value = Request.QueryString["OrderNo"].ToString();
            }

            if (Request.QueryString["RefNo"] != "--Select Ref No--" && Request.QueryString["RefNo"] != null)
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.Text).Value = Request.QueryString["RefNo"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0 && Request.QueryString["StyleID"] != null)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0 && Request.QueryString["CompId"] != null)
            {
                cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompId"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["SuppId"]) > 0 && Request.QueryString["SuppId"] != null)
            {
                cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SuppId"].ToString();
            }

            if (Request.QueryString["ItemType"] != "--Select Item Type--" && Request.QueryString["ItemType"] != null)
            {
                cmd.Parameters.Add("@ItemType", SqlDbType.Text).Value = Request.QueryString["ItemType"].ToString();
            }

            cmd.Parameters.Add("@FromDate", SqlDbType.Text).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.Text).Value = Request.QueryString["ToDate"].ToString();

            sda.SelectCommand = cmd;
            StyleWisePOGRNInvoiceDataSet ds = new StyleWisePOGRNInvoiceDataSet();
            sda.Fill(ds, "StyleWisePOGRNInvoiceDataSet");
            return ds;
        }
    }
}