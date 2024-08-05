using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Globalization;
using System;
using Microsoft.Reporting.WebForms;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Stores.PurchaseInvoice
{
    public partial class PurchaseInvoiceInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/PurchaseInvoice/PurchaseInvoiceInlineReport.rdlc");

                ReportParameter rp1 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());
                ReportParameter rp2 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                ReportParameter rp3 = new ReportParameter("Purrate", Request.QueryString["Purrate"].ToString());
                ReportParameter rp4 = new ReportParameter("Invqty", Request.QueryString["Invqty"].ToString());
                ReportParameter rp5 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp6 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp7 = new ReportParameter("ImagePath", img);


                PurchaseInvoiceMainlistInlineDataset ds = GetData();
                PurchaseInvoiceDetailInlineDataset ds1 = GetData1();
                PurchaseInvoiceOrderNoInlineDataset ds2 = GetData2();
                PurchaseInvoiceReferenceInlineDataset ds3 = GetData3();
                PurchaseInvoiceHeaderDataSet ds4 = GetData4();
                PurchaseInvoiceAddlessDataSet ds5 = GetData5();
                ReportDataSource datasource = new ReportDataSource("PurchaseInvoiceMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseInvoiceDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseInvoiceOrderNoInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseInvoiceReferenceInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PurchaseInvoiceHeaderStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PurchaseInvoiceAddlessStatement", ds5.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4,rp5,rp6,rp7 });


            }
        }
        public PurchaseInvoiceMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseInvoiceMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            PurchaseInvoiceMainlistInlineDataset ds = new PurchaseInvoiceMainlistInlineDataset();
            sda.Fill(ds, "PurchaseInvoiceMainlistInlineDataset");
            return ds;
        }

        public PurchaseInvoiceDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseInvoiceDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            PurchaseInvoiceDetailInlineDataset ds = new PurchaseInvoiceDetailInlineDataset();
            sda.Fill(ds, "PurchaseInvoiceDetailInlineDataset");
            return ds;
        }
        public PurchaseInvoiceOrderNoInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseInvoiceOrderNoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            PurchaseInvoiceOrderNoInlineDataset ds = new PurchaseInvoiceOrderNoInlineDataset();
            sda.Fill(ds, "PurchaseInvoiceOrderNoInlineDataset");
            return ds;
        }

        public PurchaseInvoiceReferenceInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseInvoiceReferenceInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            PurchaseInvoiceReferenceInlineDataset ds = new PurchaseInvoiceReferenceInlineDataset();
            sda.Fill(ds, "PurchaseInvoiceReferenceInlineDataset");
            return ds;
        }
        public PurchaseInvoiceHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PURCHASE INVOICE";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            PurchaseInvoiceHeaderDataSet ds = new PurchaseInvoiceHeaderDataSet();
            sda.Fill(ds, "PurchaseInvoiceHeaderDataSet");
            return ds;
        }

        public PurchaseInvoiceAddlessDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseInvoiceAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            PurchaseInvoiceAddlessDataSet ds = new PurchaseInvoiceAddlessDataSet();
            sda.Fill(ds, "PurchaseInvoiceAddlessDataSet");
            return ds;
        }
    }
}