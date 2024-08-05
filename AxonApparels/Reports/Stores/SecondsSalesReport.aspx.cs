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

namespace AxonApparels.Reports.Stores
{
    public partial class SecondsSalesReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/SecondsSalesReport.rdlc");

                //ReportParameter rp1 = new ReportParameter("orderchecked", Request.QueryString["orderchecked"].ToString());

                SecondsSalesDataSet ds = GetData();

                ReportDataSource datasource1 = new ReportDataSource("SecondsSalesStatement", ds.Tables[1]);
              
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
              
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });

            }
        }


        public SecondsSalesDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSecondsSalesStatement", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            sda.SelectCommand = cmd;
            if (Request.QueryString["OrdNo"] != "")
            {
                cmd.Parameters.Add("@Orderno", SqlDbType.VarChar).Value = Request.QueryString["OrdNo"].ToString();
            }
            if (Request.QueryString["RefNo"] != "")
            {
                cmd.Parameters.Add("@Refno", SqlDbType.VarChar).Value = Request.QueryString["OrRefNo"].ToString();
            }
            if (Request.QueryString["Entry"] != "")
            {
                cmd.Parameters.Add("@Entryno ", SqlDbType.VarChar).Value = Request.QueryString["Entry"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["StyID"]) > 0)
            {
                cmd.Parameters.Add("@styleid", SqlDbType.Int).Value = Request.QueryString["StyID"].ToString();
            }
            if (Convert.ToInt32(Request.QueryString["SuppID"]) > 0)
            {
                cmd.Parameters.Add("@supplierid", SqlDbType.Int).Value = Request.QueryString["SuppID"];
            }
            if (Convert.ToInt32(Request.QueryString["CmpID"]) > 0)
            {
                cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CmpID"];
            }
            if (Request.QueryString["Fdt"] != "")
            {
                cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = Request.QueryString["Fdt"].ToString();
            }
            if (Request.QueryString["Tdt"] != "")
            {
                cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = Request.QueryString["Tdt"].ToString();
            }
            SecondsSalesDataSet ds = new SecondsSalesDataSet();
            sda.Fill(ds, "SecondsSalesDataSet");
            return ds;
        }


    }
}