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

namespace AxonApparels.ReportInline.Stores.SpecialRequisition
{
    public partial class SpecialRequisitionInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                var RepView = Request.QueryString["AppQtyView"];

                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                if (RepView == "0")
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/SpecialRequisition/SpecialRequisitionApprovalInlineReport.rdlc");
                }
                else
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/SpecialRequisition/SpecialRequisitionInlineReport.rdlc");
                }
                
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportParameter rp2 = new ReportParameter("AppQty", Request.QueryString["AppQtyView"]);

                SpecialRequisitionMainlistInlineDataset ds = GetData();
                SpecialRequisitionDetailInlineDataset ds1 = GetData1();
                SpecialRequisitionHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("SpecialRequisitionMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("SpecialRequisitionDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("SpecialRequisitionHeaderStatement", ds2.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2 });
            }
        }
        public SpecialRequisitionMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SpecialReqMainlistInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            SpecialRequisitionMainlistInlineDataset ds = new SpecialRequisitionMainlistInlineDataset();
            sda.Fill(ds, "SpecialRequisitionMainlistInlineDataset");
            return ds;
        }

        public SpecialRequisitionDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_SpecialReqDetailInlineReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            sda.SelectCommand = cmd;
            SpecialRequisitionDetailInlineDataset ds = new SpecialRequisitionDetailInlineDataset();
            sda.Fill(ds, "SpecialRequisitionDetailInlineDataset");
            var RepView = Request.QueryString["AppQtyView"];
            if (RepView == "0")
            {
                if (ds.Tables[1].Rows.Count > 0)
                {
                    //if (Request.QueryString["Size"].ToString() == "0")
                    //{
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[1].Rows[i];
                        var data = Convert.ToInt32(dr.ItemArray[18]);
                        if (data < 0 || data == 0)
                        {
                            ds.Tables[1].Rows[i][12] = 0;
                        }
                        else
                        {

                        }
                    }
                    //}

                }
                return ds;
            }
            else
            {
                return ds;
            }
            
        }
        public SpecialRequisitionHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "SPECIAL REQUISITION";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            SpecialRequisitionHeaderDataSet ds = new SpecialRequisitionHeaderDataSet();
            sda.Fill(ds, "SpecialRequisitionHeaderDataSet");
            return ds;
        }
    }
}