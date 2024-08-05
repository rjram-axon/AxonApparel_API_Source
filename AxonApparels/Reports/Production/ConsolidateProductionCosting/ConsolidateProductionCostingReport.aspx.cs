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

namespace AxonApparels.Reports.Production.ConsolidateProductionCosting
{
    public partial class ConsolidateProductionCostingReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Production/ConsolidateProductionCosting/ConsolidateProductionCostingReport.rdlc");

               // ReportParameter rp1 = new ReportParameter("DtFilter", Request.QueryString["DtFilter"].ToString());

                ConsolidateProductionCostDataSet ds = GetData();
                CompanyDetStatementDataSet ds1 = GetData1();

                ReportDataSource datasource1 = new ReportDataSource("ConsolidateProductionCostStatement", ds.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CompanyDetStatement", ds1.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);


               // ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
                ReportViewer1.LocalReport.Refresh();

            }
        }


        public ConsolidateProductionCostDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetConsolidateProductionCosting", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@BuyOrdNo", SqlDbType.VarChar, 100).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.Int).Value = Request.QueryString["RefNo"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }
            if (Request.QueryString["DtFilter"] != "")
            {
                cmd.Parameters.Add("@DtFilter", SqlDbType.VarChar, 5).Value = Request.QueryString["DtFilter"].ToString();
            }
            ConsolidateProductionCostDataSet ds = new ConsolidateProductionCostDataSet();
            sda.Fill(ds, "ConsolidateProductionCostDataSet");

            if (ds.Tables[1].Rows.Count > 0)
            {

                if (Request.QueryString["ColorGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][5] = "";
                    }
                }
                if (Request.QueryString["SizeGrp"].ToString() == "true")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][6] = "";
                    }
                }
            }


            return ds;
        }

        public CompanyDetStatementDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadCompDetStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompId"];

            sda.SelectCommand = cmd;
            CompanyDetStatementDataSet ds = new CompanyDetStatementDataSet();
            sda.Fill(ds, "CompanyDetStatementDataSet");
            return ds;
        }

    }
}