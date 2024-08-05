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

namespace AxonApparels.ReportInline.Process.GeneralProcessReturn
{
    public partial class GeneralProcessReturnInlineReport : System.Web.UI.Page
    { 
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/GeneralProcessReturn/GeneralProcessReturnInlineReport.rdlc");
                ReportParameter rp1 = new ReportParameter("RetlossDet", Request.QueryString["RetlossDet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp4 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp5 = new ReportParameter("ImagePath", img);
                GeneralProcessReturnMainlistInlineDataSet ds = GetData();
                GeneralProcessReturnDetailInlineDataSet ds1 = GetData1();
                GeneralProcessReturnHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("GeneralProcessReturnMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("GeneralProcessReturnDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("GeneralProcessReturnHeaderStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4,rp5 });
            }
        }
        public GeneralProcessReturnMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReturnMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
           
            sda.SelectCommand = cmd;
            GeneralProcessReturnMainlistInlineDataSet ds = new GeneralProcessReturnMainlistInlineDataSet();
            sda.Fill(ds, "GeneralProcessReturnMainlistInlineDataSet");
            return ds;
        }

        public GeneralProcessReturnDetailInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessReturnDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessReturnDetailInlineDataSet ds = new GeneralProcessReturnDetailInlineDataSet();
            sda.Fill(ds, "GeneralProcessReturnDetailInlineDataSet");
            return ds;
        }
        public GeneralProcessReturnHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS RETURN";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            GeneralProcessReturnHeaderDataSet ds = new GeneralProcessReturnHeaderDataSet();
            sda.Fill(ds, "GeneralProcessReturnHeaderDataSet");
            return ds;
        }
    }
}