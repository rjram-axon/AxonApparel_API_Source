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


namespace AxonApparels.Reports
{
    public partial class SupplierMas_Report : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/SupplierMas_Report/SupplierMas_Report.rdlc");
                SupplierDetailsDataSet ds = GetData();
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
               // ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportDataSource datasource = new ReportDataSource("SupplierDetailsStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
             

                //ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(WorkOrdColorSubReport);
                //ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(WorkOrdAssortColorSubReport);
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }

        }

        public SupplierDetailsDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasSupplier", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if ( Request.QueryString["Status"] != null)
            {
                cmd.Parameters.Add("@Status", SqlDbType.Int).Value = Request.QueryString["Status"].ToString();
            }
            sda.SelectCommand = cmd;
            SupplierDetailsDataSet ds = new SupplierDetailsDataSet();
            sda.Fill(ds, "SupplierDetailsDataset");
            return ds;
        }


    }
}