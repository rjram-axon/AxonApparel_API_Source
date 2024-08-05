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

namespace AxonApparels.Reports.Process.ProcessInvoice
{
    public partial class ProcessInvoiceReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Process/ProcessInvoice/ProcessInvoiceReport.rdlc");
                ProcessInvoiceDetailDataSet ds = GetData();
                ReportDataSource datasource = new ReportDataSource("ProcessInvoiceDetailReport", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
            }
        }
        public ProcessInvoiceDetailDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessInvoiceDetailReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@compid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            cmd.Parameters.Add("@bmasid", SqlDbType.VarChar,50).Value = Request.QueryString["ByOrdId"].ToString();
            cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["UnId"];
            cmd.Parameters.Add("@itmid", SqlDbType.Int).Value = Request.QueryString["ItmId"];
            cmd.Parameters.Add("@refid", SqlDbType.VarChar, 50).Value = Request.QueryString["RefId"].ToString();
            cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = Request.QueryString["BuyId"];
            cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["ColId"];
            cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["PrcId"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Otype"].ToString();
            cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@Todate", SqlDbType.VarChar).Value = Request.QueryString["tdate"].ToString();
            cmd.Parameters.Add("@Processorid", SqlDbType.Int).Value = Request.QueryString["Supid"];
            //cmd.Parameters.Add("@joborwork", SqlDbType.VarChar).Value = Request.QueryString["joborwork"].ToString();
            //cmd.Parameters.Add("@ordertype", SqlDbType.VarChar).Value = Request.QueryString["ordertype"].ToString();
            //cmd.Parameters.Add("@ProcessorType", SqlDbType.VarChar).Value = Request.QueryString["ProcessorType"].ToString();
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
            ProcessInvoiceDetailDataSet ds = new ProcessInvoiceDetailDataSet();
            sda.Fill(ds, "ProcessInvoiceDetailDataSet");
            return ds;
        }
    }
}