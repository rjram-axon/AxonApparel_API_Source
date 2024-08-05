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

namespace AxonApparels.Reports
{
    public partial class StockGroupwiseReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StockGroupwiseReport.rdlc");
                ReportParameter rp1 = new ReportParameter("gtype", Request.QueryString["gtype"].ToString());
                ReportParameter rp2 = new ReportParameter("shvalue", Request.QueryString["shvalue"].ToString());
                ReportParameter rp3 = new ReportParameter("shmanu", Request.QueryString["shmanu"].ToString());
                ReportParameter rp4 = new ReportParameter("shstr", Request.QueryString["shstr"].ToString());
                ReportParameter rp5 = new ReportParameter("shclr", Request.QueryString["shclr"].ToString());
                ReportParameter rp6 = new ReportParameter("shsize", Request.QueryString["shsize"].ToString());
                ReportParameter rp7 = new ReportParameter("shordinf", Request.QueryString["shordinf"].ToString());
                ReportParameter rp8 = new ReportParameter("shrefno", Request.QueryString["shrefno"].ToString());
                ReportParameter rp9 = new ReportParameter("shsea", Request.QueryString["shsea"].ToString());
                ReportParameter rp10 = new ReportParameter("shage", Request.QueryString["shage"].ToString());   
                StockGrpwiseDataset dsCustomers = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();
                ReportDataSource datasource = new ReportDataSource("StockGrpwiseStatement", dsCustomers.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10 });
            }
        }
        public StockGrpwiseDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StockGroupwise", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@UnitID", SqlDbType.Int).Value = Request.QueryString["UnitID"];
            cmd.Parameters.Add("@CmpID", SqlDbType.Int).Value = Request.QueryString["CmpID"];
            cmd.Parameters.Add("@SuppID", SqlDbType.Int).Value = Request.QueryString["SuppID"]; 
            cmd.Parameters.Add("@ManuID", SqlDbType.Int).Value = Request.QueryString["ManuID"];
            cmd.Parameters.Add("@ProcID", SqlDbType.Int).Value = Request.QueryString["ProcID"];
            cmd.Parameters.Add("@IgID", SqlDbType.Int).Value = Request.QueryString["IgID"];
            cmd.Parameters.Add("@ItmID", SqlDbType.Int).Value = Request.QueryString["ItmID"];
            cmd.Parameters.Add("@ClID", SqlDbType.Int).Value = Request.QueryString["ClID"];
            cmd.Parameters.Add("@SzID", SqlDbType.Int).Value = Request.QueryString["SzID"];
            cmd.Parameters.Add("@StrID", SqlDbType.Int).Value = Request.QueryString["StrID"];
            cmd.Parameters.Add("@OrRefNo", SqlDbType.VarChar, 100).Value = Request.QueryString["OrRefNo"].ToString();
            cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar, 20).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@gtype", SqlDbType.VarChar, 1).Value = Request.QueryString["gtype"].ToString();
            cmd.Parameters.Add("@Otype", SqlDbType.VarChar, 1).Value = Request.QueryString["Otype"].ToString();
            cmd.Parameters.Add("@Stktype", SqlDbType.VarChar, 1).Value = Request.QueryString["Stktype"].ToString();
            sda.SelectCommand = cmd;
            StockGrpwiseDataset ds = new StockGrpwiseDataset();
            sda.Fill(ds, "StockGrpwiseDataset");
            return ds;
        }
        public CompanyDetStatementDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CmpID"];

            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }
    }
}