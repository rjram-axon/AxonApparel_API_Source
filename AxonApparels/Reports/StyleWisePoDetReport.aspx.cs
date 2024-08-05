using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AxonApparels.Reports
{
    public partial class StyleWisePoDetReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/StyleWisePoDetReport.rdlc");
                StyleWisePoDetDataSet ds = GetData();

                //ReportParameter rp1 = new ReportParameter("OrderNo", Request.QueryString["OrderNo"].ToString());
                //ReportParameter rp2 = new ReportParameter("StyleID", Request.QueryString["StyleID"].ToString());
                //ReportParameter rp3 = new ReportParameter("RefNo", Request.QueryString["RefNo"].ToString());
                //ReportParameter rp4 = new ReportParameter("CompId", Request.QueryString["CompId"].ToString());
                //ReportParameter rp5 = new ReportParameter("SuppId", Request.QueryString["SuppId"].ToString());
                //ReportParameter rp6 = new ReportParameter("ItemType", Request.QueryString["ItemType"].ToString());
                //ReportParameter rp7 = new ReportParameter("FromDate", Request.QueryString["FromDate"].ToString());
                //ReportParameter rp8 = new ReportParameter("ToDate", Request.QueryString["ToDate"].ToString());

                ReportDataSource datasource = new ReportDataSource("StyleWisePoDetStatement", ds.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8});                
            }
        }

        public StyleWisePoDetDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStyleWisePOReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["OrderNo"] != null && Request.QueryString["OrderNo"] != "--Select Order No--")
            {
                cmd.Parameters.Add("@OrderNo", SqlDbType.Text).Value = Request.QueryString["OrderNo"].ToString();                                
            }

            if (Request.QueryString["RefNo"] != "--Select Ref No--" && Request.QueryString["RefNo"] != null)
            {
                cmd.Parameters.Add("@RefNo", SqlDbType.Text).Value = Request.QueryString["RefNo"].ToString();                
            }

            if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0 && Request.QueryString["StyleID"] != null)
            {
                cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["CompId"]) > 0 && Request.QueryString["CompId"] != null)
            {
                cmd.Parameters.Add("@companyid", SqlDbType.Int).Value = Request.QueryString["CompId"].ToString();
            }

            if (Convert.ToInt32(Request.QueryString["SuppId"]) > 0 && Request.QueryString["SuppId"] != null)
            {
                cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SuppId"].ToString();
            }

            if (Request.QueryString["ItemType"] != "--Select Item Type--" && Request.QueryString["ItemType"] != null)
            {
                cmd.Parameters.Add("@ItemType", SqlDbType.Text).Value = Request.QueryString["ItemType"].ToString();
            }
            
                cmd.Parameters.Add("@FromDate", SqlDbType.Text).Value = Request.QueryString["FromDate"].ToString();
                cmd.Parameters.Add("@ToDate", SqlDbType.Text).Value = Request.QueryString["ToDate"].ToString();

            sda.SelectCommand = cmd;
            StyleWisePoDetDataSet ds = new StyleWisePoDetDataSet();
            sda.Fill(ds, "StyleWisePoDetDataSet");
            return ds;
        }
    }
}