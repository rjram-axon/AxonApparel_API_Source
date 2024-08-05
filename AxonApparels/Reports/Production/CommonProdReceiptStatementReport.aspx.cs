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

namespace AxonApparels.Reports.Production
{
    public partial class CommonProdReceiptStatementReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Production/CommonProdReceiptStatementReport.rdlc");
            CommonProdRecptStatReport ds = GetData();

            ReportDataSource datasource = new ReportDataSource("CommonProdReceiptStatReport", ds.Tables[1]);

            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(datasource);
        }

        public CommonProdRecptStatReport GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProductionCommonProdRecptstmt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.Add("@despatchid", SqlDbType.Int).Value = Request.QueryString["DespatchId"].ToString();
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
            //cmd.Parameters.Add("@Unitid", SqlDbType.Int).Value = Request.QueryString["UnitId"];
            //cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            //cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrdNo"].ToString();
            //cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 20).Value = Request.QueryString["RefNo"].ToString();
            //cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Request.QueryString["StyleID"];
            //cmd.Parameters.Add("@Processorid", SqlDbType.Int).Value = Request.QueryString["ProcessorId"];
            //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Request.QueryString["StoreId"];
            //cmd.Parameters.Add("@Jobordno", SqlDbType.VarChar, 20).Value = Request.QueryString["JobOrdNo"].ToString();
            //cmd.Parameters.Add("@processid", SqlDbType.Int).Value = Request.QueryString["ProcessID"];
            //cmd.Parameters.Add("@itemid", SqlDbType.Int).Value = Request.QueryString["ItemID"];
            //cmd.Parameters.Add("@seasonid", SqlDbType.Int).Value = Request.QueryString["SeasonID"];
            //cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Request.QueryString["ColorID"];
            ////cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Request.QueryString["SizeID"];
            //cmd.Parameters.Add("@Ordtype", SqlDbType.Char, 1).Value = Request.QueryString["OrdType"].ToString();
            //cmd.Parameters.Add("@proctype", SqlDbType.Char, 1).Value = Request.QueryString["proctype"].ToString();
            //cmd.Parameters.Add("@Itemtype", SqlDbType.Char, 1).Value = Request.QueryString["Itemtype"].ToString();
            //cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            //cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();

            sda.SelectCommand = cmd;
            CommonProdRecptStatReport ds = new CommonProdRecptStatReport();
            sda.Fill(ds, "CommonProdRecptStatReport");
            return ds;
        }
    }
}