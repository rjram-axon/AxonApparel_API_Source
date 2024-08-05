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

namespace AxonApparels.ReportInline.Stores.StoresReturnReportInline
{
    public partial class StoresReturnReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) 
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresReturnReportInline/StoresReturnReportInline.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                StoresReturnMainlistInlineDataSet ds = GetData();
                StoresReturnItmDetInlineDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("StoresReturnMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("StoresReturnItmDetInlineStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }

        public StoresReturnMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoresRetMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Return_ID", SqlDbType.Int).Value = Request.QueryString["MasId"];
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
            //if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            //{
            //    cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
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
            StoresReturnMainlistInlineDataSet ds = new StoresReturnMainlistInlineDataSet();
            sda.Fill(ds, "StoresReturnMainlistInlineDataSet");
            return ds;
        }
        public StoresReturnItmDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoresRetItemDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Return_ID", SqlDbType.Int).Value = Request.QueryString["MasId"];
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
            //if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            //{
            //    cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
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
            StoresReturnItmDetInlineDataSet ds = new StoresReturnItmDetInlineDataSet();
            sda.Fill(ds, "StoresReturnItmDetInlineDataSet");
            return ds;
        }
    }
}