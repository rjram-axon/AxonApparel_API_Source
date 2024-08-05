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


namespace AxonApparels.Reports.Production.ProductionInvoiceReportStatement
{
    public partial class ProductionInvoiceStatement : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Production/ProductionInvoiceReportStatement/ProductionInvoiceStatement.rdlc");
                ProductionInvRepDetDataSet ds1 = Getdata();
                ReportDataSource datesource=new ReportDataSource("ProductionInvRepDetStatement",ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datesource);
            }
        }
        public ProductionInvRepDetDataSet Getdata()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProductionInvoiceDetailReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@compid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["UnId"];
            cmd.Parameters.Add("@buyid", SqlDbType.Int).Value = Request.QueryString["BuyId"];
            cmd.Parameters.Add("@ordtype", SqlDbType.VarChar, 1).Value = Request.QueryString["Otype"].ToString();
            cmd.Parameters.Add("@ordno", SqlDbType.VarChar, 100).Value = Request.QueryString["ByOrdId"].ToString();
            cmd.Parameters.Add("@refno", SqlDbType.VarChar, 100).Value = Request.QueryString["RefId"].ToString();
            cmd.Parameters.Add("@itemid", SqlDbType.Int).Value = Request.QueryString["ItmId"];
            cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["ColId"];
            cmd.Parameters.Add("@procid", SqlDbType.Int).Value = Request.QueryString["PrcId"];
            cmd.Parameters.Add("@suppid", SqlDbType.Int).Value = Request.QueryString["Supid"];
            cmd.Parameters.Add("@fdate", SqlDbType.VarChar, 10).Value = Request.QueryString["fdate"].ToString();
            cmd.Parameters.Add("@tdate", SqlDbType.VarChar, 10).Value = Request.QueryString["tdate"].ToString();
            sda.SelectCommand = cmd;
            ProductionInvRepDetDataSet ds = new ProductionInvRepDetDataSet();
            sda.Fill(ds, "ProductionInvRepDetStatement");
            return ds;
        }
    }
}