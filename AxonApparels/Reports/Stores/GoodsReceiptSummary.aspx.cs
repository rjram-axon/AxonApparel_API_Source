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
    public partial class GoodsReceiptSummary : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //ReportViewer1.ProcessingMode = ProcessingMode.Local;
                //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/GoodsReceiptSummary.rdlc");
                ////ReportParameter rp1 = new ReportParameter("PONo", Request.QueryString["PO"].ToString());
                ////ReportParameter rp2 = new ReportParameter("GrnNo", Request.QueryString["GrnNo"].ToString());
                ////ReportParameter rp3 = new ReportParameter("SuppId", Request.QueryString["SuppId"].ToString());

                ////ReportParameter[] rp = new ReportParameter[] { 
                ////new ReportParameter("PONo",Request.QueryString["PO"].ToString()),
                ////new ReportParameter("GrnNo", Request.QueryString["GrnNo"].ToString()),
                ////new ReportParameter("Suppname", Request.QueryString["suppname"].ToString()),
                //// new ReportParameter("Date", Request.QueryString["FromDate"].ToString())
                ////};
                //GoodsReceiptSummaryDataSet dsCustomers = GetData();
                //ReportDataSource datasource = new ReportDataSource("GoodsReceiptSummaryStatement", dsCustomers.Tables[1]);
                //ReportViewer1.LocalReport.DataSources.Clear();
                //ReportViewer1.LocalReport.DataSources.Add(datasource);
                ////ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2,rp3 });
                //ReportViewer1.LocalReport.SetParameters( rp );
                //ReportViewer1.LocalReport.Refresh();
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/GoodsReceiptSummary.rdlc");
                GoodsReceiptSummaryDataSet dsCustomers = GetData();
                ReportDataSource datasource = new ReportDataSource("GoodsReceiptSummaryStatement", dsCustomers.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public GoodsReceiptSummaryDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetGoodesReceiptNoteSummaryReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
           // if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
           // {
                cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            //}
           // if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
           // {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
          //  }
          //  if (Convert.ToInt32(Request.QueryString["SuppId"]) > 0)
          //  {
                cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SuppId"];
          //  }            
          //  if (Request.QueryString["GrnNo"] != "--Select Grn No--")
          //  {
                cmd.Parameters.Add("@GRNNo", SqlDbType.VarChar, 50).Value = Request.QueryString["GrnNo"].ToString();
          //  }
          //  if (Request.QueryString["PO"] != "--Select Po No--")
           // {
                cmd.Parameters.Add("@PONo", SqlDbType.VarChar, 50).Value = Request.QueryString["PO"].ToString();
           // }            
          //  if (Request.QueryString["ItemType"] != "--Select Item Type--" && Request.QueryString["ItemType"] != null)
          //  {
                cmd.Parameters.Add("@ItemType", SqlDbType.Text).Value = Request.QueryString["ItemType"].ToString();
          //  }
            cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
            cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
            sda.SelectCommand = cmd;
            GoodsReceiptSummaryDataSet ds = new GoodsReceiptSummaryDataSet();
            sda.Fill(ds, "GoodsReceiptSummaryDataSet");
            return ds;
        }
    }
}