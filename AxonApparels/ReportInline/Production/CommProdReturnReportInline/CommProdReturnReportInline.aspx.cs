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
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Production.CommProdReturnReportInline
{
    public partial class CommProdReturnReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/CommProdReturnReportInline/CommProdReturnReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());
                ReportParameter rp2 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp3 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                CommProdReturnMainlistInlineDataSet ds = GetData();
                CommProdReturnDetInlineDataSet ds1 = GetData1();
                CommProdReturnOrdDetInlineDataSet ds2 = GetData2();
                CommProdReturnHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("CommProdReturnMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CommProdReturnDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CommProdReturnOrdDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("CommProdReturnHeaderStatement", ds3.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp4 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3,rp4});
            }
        }

        public CommProdReturnMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdReturnMainInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@ReturnID", SqlDbType.Int).Value = Request.QueryString["ProdRetEditId"];
           
            sda.SelectCommand = cmd;
            CommProdReturnMainlistInlineDataSet ds = new CommProdReturnMainlistInlineDataSet();
            sda.Fill(ds, "CommProdReturnMainlistInlineDataSet");
            return ds;
        }
        public CommProdReturnDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdReturnDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@ReturnID", SqlDbType.Int).Value = Request.QueryString["ProdRetEditId"];
           
            sda.SelectCommand = cmd;
            CommProdReturnDetInlineDataSet ds = new CommProdReturnDetInlineDataSet();
            sda.Fill(ds, "CommProdReturnDetInlineDataSet");
            return ds;
        }
        public CommProdReturnOrdDetInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdReturnOrdDetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@ReturnID", SqlDbType.Int).Value = Request.QueryString["ProdRetEditId"];
            
            sda.SelectCommand = cmd;
            CommProdReturnOrdDetInlineDataSet ds = new CommProdReturnOrdDetInlineDataSet();
            sda.Fill(ds, "CommProdReturnOrdDetInlineDataSet");
            return ds;
        }
        public CommProdReturnHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdRetEditId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PRODUCTION RETURNS";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            CommProdReturnHeaderDataSet ds = new CommProdReturnHeaderDataSet();
            sda.Fill(ds, "CommProdReturnHeaderDataSet");
            return ds;
        }
    }
}