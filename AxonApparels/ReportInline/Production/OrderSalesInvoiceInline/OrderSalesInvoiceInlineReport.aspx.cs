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
using AxonApparels.ReportInline.Company;
using Microsoft.Reporting.WebForms;


namespace AxonApparels.ReportInline.Production.OrderSalesInvoiceInline
{
    public partial class OrderSalesInvoiceInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                ReportViewer1.ProcessingMode = ProcessingMode.Local;

                if (Convert.ToInt32(Request.QueryString["Format"]) == 1) {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/OrderSalesInvoiceInline/OrderSalesInvoiceInlineReport.rdlc");
                }
                else
                {

                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/OrderSalesInvoiceInline/OrderSalesInvoiceInlineReport_Format2.rdlc");
                }
                //ReportParameter rp1 = new ReportParameter("OrdRefNo", Request.QueryString["OrdRefNo"].ToString());
                //ReportParameter rp2 = new ReportParameter("Remarks", Request.QueryString["Remarks"].ToString());
                //ReportParameter rp3 = new ReportParameter("EWayBill", Request.QueryString["EWayBill"].ToString());
                //ReportParameter rp4 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                //ReportParameter rp6 = new ReportParameter("Size", Request.QueryString["Size"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                SalesInvmainInlineDataSet ds = GetData();
                SalesInvDetInlineDataSet ds1 = GetData1();
                SalesInvAddLessDataSet ds2 = GetData2();

                ReportDataSource datasource = new ReportDataSource("SalesInvmainInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("SalesInvDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("SalesInvAddLessStatement", ds2.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }


        public SalesInvmainInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSalesInvmainInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Invid", SqlDbType.Int).Value = Request.QueryString["InvId"].ToString();
            sda.SelectCommand = cmd;
            SalesInvmainInlineDataSet ds = new SalesInvmainInlineDataSet();
            sda.Fill(ds, "SalesInvmainInlineDataSet");
            return ds;
        }
        public SalesInvDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSalesInvDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Invid", SqlDbType.Int).Value = Request.QueryString["InvId"].ToString();
            sda.SelectCommand = cmd;
            SalesInvDetInlineDataSet ds = new SalesInvDetInlineDataSet();
            sda.Fill(ds, "SalesInvDetInlineDataSet");
            return ds;
        }

        public SalesInvAddLessDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSalesInvEditAddlessDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@InMasId", SqlDbType.Int).Value = Request.QueryString["InvId"].ToString();
            sda.SelectCommand = cmd;
            SalesInvAddLessDataSet ds = new SalesInvAddLessDataSet();
            sda.Fill(ds, "SalesInvAddLessDataSet");
            return ds;
        }
    }
}