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
using Microsoft.Reporting.WebForms;

namespace AxonApparels.Reports.Order
{
    public partial class BillInwardReport1 : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Order/BillInwardReport.rdlc");

                ReportParameter rp1 = new ReportParameter("supptype", Request.QueryString["prcstype"].ToString());
                ReportParameter rp2 = new ReportParameter("billdet", Request.QueryString["billdet"].ToString());
                ReportParameter rp3 = new ReportParameter("invdet", Request.QueryString["invdet"].ToString());
                ReportParameter rp4 = new ReportParameter("passdet", Request.QueryString["passdet"].ToString());
                ReportParameter rp5 = new ReportParameter("DebCrd", Request.QueryString["DebCrd"].ToString());

                BillInwardReportStatement1DataSet ds = GetData();
            
                ReportDataSource datasource1 = new ReportDataSource("BillInwardReportStatement1", ds.Tables[1]);
           

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5 });
             

            }
        }

        public BillInwardReportStatement1DataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BillInwardReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0)
            {
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Request.QueryString["CompId"];
            }
            if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
            {
                cmd.Parameters.Add("@Buyerid", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
            }
            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["unitId"]) > 0)
            {
                cmd.Parameters.Add("@unitId", SqlDbType.Int).Value = Request.QueryString["unitId"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["processId"]) > 0)
            {
                cmd.Parameters.Add("@processId", SqlDbType.Int).Value = Request.QueryString["processId"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["process_workdiv_id"]) > 0)
            {
                cmd.Parameters.Add("@process_workdiv_id", SqlDbType.Int).Value = Request.QueryString["process_workdiv_id"].ToString();
            }

        

            if (Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar).Value = Request.QueryString["OrderNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "--Select RefNo--")
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar).Value = Request.QueryString["RefNo"].ToString();
            }

            if (Request.QueryString["FromDate"] != "")
            {
                cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 20).Value = Request.QueryString["FromDate"].ToString();
            }
            if (Request.QueryString["ToDate"] != "")
            {
                cmd.Parameters.Add("@todate", SqlDbType.VarChar, 20).Value = Request.QueryString["ToDate"].ToString();
            }

            if (Request.QueryString["Datetype"] != "")
            {
                cmd.Parameters.Add("@Datetype", SqlDbType.VarChar).Value = Request.QueryString["Datetype"].ToString();
            }

            if (Request.QueryString["statustype"] != "")
            {
                cmd.Parameters.Add("@statustype", SqlDbType.VarChar).Value = Request.QueryString["statustype"].ToString();
            }

            if (Request.QueryString["ordertype"] != "")
            {
                cmd.Parameters.Add("@ordertype", SqlDbType.VarChar).Value = Request.QueryString["ordertype"].ToString();
            }


            if (Request.QueryString["Supptype"] != "")
            {
                cmd.Parameters.Add("@InOrExt", SqlDbType.VarChar).Value = Request.QueryString["Supptype"].ToString();
            }


            if (Request.QueryString["invtype"] != "")
            {
                cmd.Parameters.Add("@Invtype", SqlDbType.VarChar).Value = Request.QueryString["invtype"].ToString();
            }


            if (Request.QueryString["Passtype"] != "")
            {
                cmd.Parameters.Add("@passtype", SqlDbType.VarChar).Value = Request.QueryString["Passtype"].ToString();
            }


            if (Request.QueryString["Billno"] != "")
            {
                cmd.Parameters.Add("@BillNo", SqlDbType.VarChar).Value = Request.QueryString["Billno"].ToString();
            }

            if (Request.QueryString["SBillno"] != "")
            {
                cmd.Parameters.Add("@SBillNo", SqlDbType.VarChar).Value = Request.QueryString["SBillno"].ToString();
            }

      

            sda.SelectCommand = cmd;

            BillInwardReportStatement1DataSet ds = new BillInwardReportStatement1DataSet();
            sda.Fill(ds, "BillInwardReportStatement1DataSet");
            return ds;
        }
    }
}