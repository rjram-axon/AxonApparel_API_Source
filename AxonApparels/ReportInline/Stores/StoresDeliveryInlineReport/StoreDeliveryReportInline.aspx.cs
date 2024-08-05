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

namespace AxonApparels.ReportInline.Stores
{
    public partial class StoreDeliveryReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                string rpttyp = Request.QueryString["RptTyp"].ToString();
                if (rpttyp == "R")
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresDeliveryInlineReport/StoresDeliveryReportInlineDotM.rdlc");
                }
                else
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresDeliveryInlineReport/StoresDeliveryReportInline.rdlc");
                }

                //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/StoresDeliveryInlineReport/StoresDeliveryReportInline.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp15 = new ReportParameter("ImagePath", img);


                ReportParameter rp1 = new ReportParameter("IssueId", Request.QueryString["IssueId"].ToString());
                ReportParameter rp2 = new ReportParameter("Remarks", Request.QueryString["Remarks"].ToString());
                ReportParameter rp3 = new ReportParameter("TotalQty", Request.QueryString["TotalQty"].ToString());
                ReportParameter rp4 = new ReportParameter("SecQty", Request.QueryString["SecQty"].ToString());
                ReportParameter rp5 = new ReportParameter("Splitup", Request.QueryString["Splitup"].ToString());
                ReportParameter rp6 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());

                ReportParameter rp7 = new ReportParameter("IssueQty", Request.QueryString["IssueQty"].ToString());
                ReportParameter rp8 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp9 = new ReportParameter("DeliLoc", Request.QueryString["DeliLoc"].ToString());
                ReportParameter rp10 = new ReportParameter("ExcessQty", Request.QueryString["ExcessQty"].ToString());
                ReportParameter rp11 = new ReportParameter("OrdNo", Request.QueryString["OrdNo"].ToString());
                ReportParameter rp12 = new ReportParameter("WrkOrdNo", Request.QueryString["WrkOrdNo"].ToString());

                ReportParameter rp13 = new ReportParameter("ArtNo", Request.QueryString["ArtNo"].ToString());
                ReportParameter rp14 = new ReportParameter("RefNo", Request.QueryString["RefNo"].ToString());

                //StoreDelMainlisInlineDataSet ds = GetData();
                StoreDelDetInlineDataSet ds1 = GetData1();
                StoresDelHeaderInfoDataset ds2 = GetData2();
                //ReportDataSource datasource = new ReportDataSource("StoreDelMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("StoreDelDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("StoreDelHeaderInlineStatement", ds2.Tables[1]); 
                ReportViewer1.LocalReport.DataSources.Clear();
                //ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14,rp15 });
            }
        }

        //public StoreDelMainlisInlineDataSet GetData()
        //{
        //    string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
        //    con = new SqlConnection(conString);
        //    SqlCommand cmd = new SqlCommand("Proc_Apparel_StoresDelMainlistDetInline", con);
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Add("@IssueId", SqlDbType.Int).Value = Request.QueryString["IssueId"];
        //    //if (Convert.ToInt32(Request.QueryString["CompanyID"]) > 0)
        //    //{
        //    //    cmd.Parameters.Add("@CompanyID", SqlDbType.Int).Value = Request.QueryString["CompanyID"];
        //    //}
        //    //if (Convert.ToInt32(Request.QueryString["SupplierID"]) > 0)
        //    //{
        //    //    cmd.Parameters.Add("@SupplierID", SqlDbType.Int).Value = Request.QueryString["SupplierID"];
        //    //}
        //    //if (Convert.ToInt32(Request.QueryString["BuyerID"]) > 0)
        //    //{
        //    //    cmd.Parameters.Add("@BuyerID", SqlDbType.Int).Value = Request.QueryString["BuyerID"];
        //    //}
        //    //if (Convert.ToInt32(Request.QueryString["ColorID"]) > 0)
        //    //{
        //    //    cmd.Parameters.Add("@ColorID", SqlDbType.Int).Value = Request.QueryString["ColorID"];
        //    //}
        //    //if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
        //    //{
        //    //    cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
        //    //}
        //    //if (Convert.ToInt32(Request.QueryString["StyleID"]) > 0)
        //    //{
        //    //    cmd.Parameters.Add("@StyleID", SqlDbType.Int).Value = Request.QueryString["StyleID"];
        //    //}
        //    //if (Request.QueryString["OrderType"] != "0")
        //    //{
        //    //    cmd.Parameters.Add("@OrderType", SqlDbType.VarChar, 50).Value = Request.QueryString["OrderType"].ToString();
        //    //}
        //    //cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 10).Value = Request.QueryString["FromDate"].ToString();
        //    //cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 10).Value = Request.QueryString["ToDate"].ToString();
        //    sda.SelectCommand = cmd;
        //    StoreDelMainlisInlineDataSet ds = new StoreDelMainlisInlineDataSet();
        //    sda.Fill(ds, "StoreDelMainlisInlineDataSet");
        //    return ds;
        //}
        public StoreDelDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoresDelDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@IssueId", SqlDbType.Int).Value = Request.QueryString["IssueId"];
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
            StoreDelDetInlineDataSet ds = new StoreDelDetInlineDataSet();
            sda.Fill(ds, "StoreDelDetInlineDataSet");
            return ds;
        }

        public StoresDelHeaderInfoDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_StoresDeliveryHeaderInfo", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@IssueId", SqlDbType.Int).Value = Request.QueryString["IssueId"];
            
            sda.SelectCommand = cmd;
            StoresDelHeaderInfoDataset ds = new StoresDelHeaderInfoDataset();
            sda.Fill(ds, "StoresDelHeaderInfoDataset");
            return ds;
        }
    }
}