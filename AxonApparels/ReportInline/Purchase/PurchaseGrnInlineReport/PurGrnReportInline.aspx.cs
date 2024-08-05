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
using AxonApparel.Business;
using AxonApparels.ReportInline.Company;

namespace AxonApparels.ReportInline.Purchase
{
    public partial class PurGrnReportInline : System.Web.UI.Page
    {

        IPurchaseGrnMainBusiness purgrnobj = new PurchaseGrnMainBusiness();
        
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
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInlineDotM.rdlc");
                }
                else
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.rdlc");
                }
                //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.rdlc");
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
               

                ReportParameter rp1 = new ReportParameter("Orderno", Request.QueryString["Orderno"].ToString());
                ReportParameter rp2 = new ReportParameter("Remarks", Request.QueryString["Remarks"].ToString());
                ReportParameter rp3 = new ReportParameter("Shortqty", Request.QueryString["Shortqty"].ToString());
                ReportParameter rp4 = new ReportParameter("Rejqty", Request.QueryString["Rejqty"].ToString());
                ReportParameter rp5 = new ReportParameter("Returnqty", Request.QueryString["Returnqty"].ToString());
                ReportParameter rp6 = new ReportParameter("Recvqty", Request.QueryString["Recvqty"].ToString());

                ReportParameter rp7 = new ReportParameter("Debitqty", Request.QueryString["Debitqty"].ToString());
                ReportParameter rp8 = new ReportParameter("Excsqty", Request.QueryString["Excsqty"].ToString());
                ReportParameter rp9 = new ReportParameter("Return", Request.QueryString["Return"].ToString());
                ReportParameter rp10 = new ReportParameter("Itmcode", Request.QueryString["Itmcode"].ToString());
                ReportParameter rp11 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
                ReportParameter rp12 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());


                ReportParameter rp13 = new ReportParameter("Qty2", Request.QueryString["Qty2"].ToString());
                ReportParameter rp14 = new ReportParameter("Exqty", Request.QueryString["Exqty"].ToString());
                ReportParameter rp15 = new ReportParameter("POdet", Request.QueryString["POdet"].ToString());
                ReportParameter rp16 = new ReportParameter("Grn", Request.QueryString["Grn"].ToString());
                ReportParameter rp17 = new ReportParameter("Freight", Request.QueryString["Freight"].ToString());
                ReportParameter rp18 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());

                ReportParameter rp19 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());
                ReportParameter rp20 = new ReportParameter("ItemType", Request.QueryString["ItemType"].ToString());
                ReportParameter rp21 = new ReportParameter("ImagePath", img);

                int grnid =Convert.ToInt32(Request.QueryString["GrnMasId"].ToString());
                var purid = purgrnobj.GetPurchaseOrderId(grnid);
                
                PurGrnMainlistDataSet ds = GetData();
                PurGrnInlineDataSet ds1 = GetData1();
                PurGrnOrdDetInlineDataSet ds2 = GetData2();
                PurGrnDetailsInlineDataSet ds3 = GetData3();
                PuGrnHeaderDataSet ds4 = GetData4();
                PurchaseOrderGstTrimsInlineDataSet ds5 = GetData5(purid.Value);
                PurchaseOrderInlineAddlessDataSet ds6 = GetData6(purid.Value);
                PurchaseGrnGstInlineReportDataSet ds7 = GetData7(purid.Value);
                PurchaseGrnInlineMultiRefnoDataSet ds8 = GetData8();
                PurGrnInlineMultiPOStatementDataSet ds9 = GetData9();
                GRNInlineReportPOdetDataSet ds10 = GetData10();

                ReportDataSource datasource = new ReportDataSource("PurGrnMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurGrnInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurGrnOrdDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurGrnDetailsInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PurGrnHeaderStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PurchaseOrderGstTrimsInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("PurchaseOrderInlineAddlessStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("PurchaseGrnGstInlineReportStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("PurchaseGrnInlineMultiRefnoStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("PurGrnInlineMultiPOStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("GRNInlineReportPOdetStatement", ds10.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.DataSources.Add(datasource7);
                ReportViewer1.LocalReport.DataSources.Add(datasource8);
                ReportViewer1.LocalReport.DataSources.Add(datasource9);
                ReportViewer1.LocalReport.DataSources.Add(datasource10);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20,rp21 });

            }
        }

        public PurGrnMainlistDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Grn_MasId", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();
           
            sda.SelectCommand = cmd;
            PurGrnMainlistDataSet ds = new PurGrnMainlistDataSet();
            sda.Fill(ds, "PurGrnMainlistDataSet");
            return ds;
        }
        public PurGrnInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Grn_MasId", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();
           
            sda.SelectCommand = cmd;
            PurGrnInlineDataSet ds = new PurGrnInlineDataSet();
            sda.Fill(ds, "PurGrnInlineDataSet");
            return ds;
        }
        public PurGrnOrdDetInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrnOrdDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Grn_MasId", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();
           
            sda.SelectCommand = cmd;
            PurGrnOrdDetInlineDataSet ds = new PurGrnOrdDetInlineDataSet();
            sda.Fill(ds, "PurGrnOrdDetInlineDataSet");
            return ds;
        }
        public PurGrnDetailsInlineDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurGrndetailsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Grn_MasId", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();
           
            sda.SelectCommand = cmd;
            PurGrnDetailsInlineDataSet ds = new PurGrnDetailsInlineDataSet();
            sda.Fill(ds, "PurGrnDetailsInlineDataSet");
            return ds;
        }

        public PuGrnHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["GrnMasId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PURCHASE GOODS RECEIPT";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            PuGrnHeaderDataSet ds = new PuGrnHeaderDataSet();
            sda.Fill(ds, "PuGrnHeaderDataSet");
            return ds;
        }

        public PurchaseOrderGstTrimsInlineDataSet GetData5(int purid)
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = purid;

            sda.SelectCommand = cmd;
            PurchaseOrderGstTrimsInlineDataSet ds = new PurchaseOrderGstTrimsInlineDataSet();
            sda.Fill(ds, "PurchaseOrderGstTrimsInlineDataSet");
            return ds;
        }
        public PurchaseOrderInlineAddlessDataSet GetData6(int purid)
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = purid;

            sda.SelectCommand = cmd;
            PurchaseOrderInlineAddlessDataSet ds = new PurchaseOrderInlineAddlessDataSet();
            sda.Fill(ds, "PurchaseOrderInlineAddlessDataSet");
            return ds;
        }
        public PurchaseGrnGstInlineReportDataSet GetData7(int purid)
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = purid;
            cmd.Parameters.Add("@pur_grn_id", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();
            sda.SelectCommand = cmd;
            PurchaseGrnGstInlineReportDataSet ds = new PurchaseGrnGstInlineReportDataSet();
            sda.Fill(ds, "PurchaseGrnGstInlineReportDataSet");
            return ds;
        }
        public PurchaseGrnInlineMultiRefnoDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnMultiRefNoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_grn_id", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseGrnInlineMultiRefnoDataSet ds = new PurchaseGrnInlineMultiRefnoDataSet();
            sda.Fill(ds, "PurchaseGrnInlineMultiRefnoDataSet");
            return ds;
        }
        public PurGrnInlineMultiPOStatementDataSet GetData9()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseGrnMultiPoNoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_grn_id", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();

            sda.SelectCommand = cmd;
            PurGrnInlineMultiPOStatementDataSet ds = new PurGrnInlineMultiPOStatementDataSet();
            sda.Fill(ds, "PurGrnInlineMultiPOStatementDataSet");
            return ds;
        }
        public GRNInlineReportPOdetDataSet GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GRNInlineReportPOdet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@GRNmasid", SqlDbType.Int).Value = Request.QueryString["GrnMasId"].ToString();

            sda.SelectCommand = cmd;
            GRNInlineReportPOdetDataSet ds = new GRNInlineReportPOdetDataSet();
            sda.Fill(ds, "GRNInlineReportPOdetDataSet");
            return ds;
        }
    }
}