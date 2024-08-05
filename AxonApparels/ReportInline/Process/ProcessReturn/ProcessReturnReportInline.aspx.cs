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

namespace AxonApparels.ReportsInline.Process.ProcessReturn
{
    public partial class ProcessReturnReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessReturn/ProcessReturnReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("RetlossDet", Request.QueryString["RetlossDet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp4 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp5 = new ReportParameter("ImagePath", img);

                ProcessReturnMainListInlineDataSet ds = GetData();
                ProcessReturnDetailInlineDataset ds1 = GetData1();
                ProcessReturnHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("ProcessReturnMainListInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessReturnDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessReturnHeaderStatement", ds2.Tables[1]);         
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 ,rp3,rp4,rp5});
            }
        }

        public ProcessReturnMainListInlineDataSet GetData()
        {
            string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReturnMainListInline", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@MasID", SqlDbType.Int).Value = Request.QueryString["Masid"];

                sda.SelectCommand = cmd;
                ProcessReturnMainListInlineDataSet ds = new ProcessReturnMainListInlineDataSet();
                sda.Fill(ds, "ProcessReturnMainListInlineDataSet");
                return ds;
            }
            else {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReturnMainListInlineAudit", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@MasID", SqlDbType.Int).Value = Request.QueryString["Masid"];

                sda.SelectCommand = cmd;
                ProcessReturnMainListInlineDataSet ds = new ProcessReturnMainListInlineDataSet();
                sda.Fill(ds, "ProcessReturnMainListInlineDataSet");
                return ds;
            }
        }

        public ProcessReturnDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessReturnDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@MasID", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            ProcessReturnDetailInlineDataset ds = new ProcessReturnDetailInlineDataset();
            sda.Fill(ds, "ProcessReturnDetailInlineDataset");
            return ds;
        }
        public ProcessReturnHeaderDataSet GetData2()
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
            ProcessReturnHeaderDataSet ds = new ProcessReturnHeaderDataSet();
            sda.Fill(ds, "ProcessReturnHeaderDataSet");
            return ds;
        }

        public String GetUserGroup()
        {

            string grp = "";
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetUserGroupName", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Userid", SqlDbType.Int).Value = Request.QueryString["Userid"].ToString();
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    grp = rdr["GroupName"].ToString();
                }
            }
            return grp;
        }

    }
}