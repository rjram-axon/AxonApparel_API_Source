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
using System.IO;

namespace AxonApparels.Reports
{
    public partial class BuyerOrderInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;

                if ((Request.QueryString["Mail"].ToString()) == "Y")
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/BuyerOrderInlineReportMail.rdlc");
                }
                else {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/BuyerOrderInlineReport.rdlc");
                }
                BuyerOrderSheetDataset ds = GetData();

                ReportParameter rp1 = new ReportParameter("Combodet", Request.QueryString["Combodet"].ToString());
                ReportParameter rp2 = new ReportParameter("MeasChart", Request.QueryString["MeasChart"].ToString());
                ReportParameter rp3 = new ReportParameter("OrdIns", Request.QueryString["OrdIns"].ToString());
                ReportParameter rp4 = new ReportParameter("Chklst", Request.QueryString["Chklst"].ToString());
                ReportParameter rp5 = new ReportParameter("Material", Request.QueryString["Material"].ToString());
                ReportParameter rp6 = new ReportParameter("Ratematrix", Request.QueryString["Ratematrix"].ToString());
                ReportParameter rp7 = new ReportParameter("Packing", Request.QueryString["Packing"].ToString());
                ReportParameter rp8 = new ReportParameter("GSM", Request.QueryString["GSM"].ToString());
                ReportParameter rp9 = new ReportParameter("INR", Request.QueryString["INR"].ToString());
                ReportParameter rp10 = new ReportParameter("Shipdet", Request.QueryString["Shipdet"].ToString());
                ReportParameter rp11 = new ReportParameter("PrntImg", Request.QueryString["PrntImg"].ToString());
                ReportParameter rp13 = new ReportParameter("OrdType", Request.QueryString["OrdType"].ToString());
                
                //string[] arr = new string[] { Request.QueryString["Multinam"].ToString() };
                //string strarr = Request.QueryString["Multinam"].ToString();

                //string[] words = strarr.Split(',');
                //foreach (string word in words)
                //{
                //    rp = new ReportParameter("optid", word);
                //    //mrp = new ReportParameter("optid1", word);
                //    ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp });
                //}

                //foreach (string word in words)
                //{                   
                //    if (word == "13358")
                //    {
                //        rp = new ReportParameter("optid", word);
                //    }
                //    if (word == "13467")
                //    {
                //        mrp = new ReportParameter("optid1", word);
                //    }
                //}

                //List<ReportParameter> paramList = new List<ReportParameter>();
                //ReportParameter param = new ReportParameter("optid");

                //string[] values = new string[] { strarr };

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid=Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp12 = new ReportParameter("ImagePath", img);

                BuyerOrderSheetstyleDataset ds1 = GetData1();
                BuyerOrderSheetcolsizDataset ds2 = GetData2();
                BuyerOrderHeaderDataSet ds3 = GetData3();
                BuyerOrderShipmentDataSet ds4 = GetData4();
                BuyerOrderPackInlineDataset ds5 = GetData5();
                BuyerOrdSheetPackListDataset ds6 = GetData6();
                StyleImageDetDataSet ds7 = GetData7();
                ReportDataSource datasource = new ReportDataSource("BuyerOrderSheetStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("BuyerOrderSheetstylestatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("BuyerOrderSheetClSizStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("BuyerOrderSheetHeaderStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("BuyerOrderShipmentStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("BuyerOrderPackInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("BuyerOrdSheetPackListStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("StyleImageDetSattement", ds7.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2,rp3,rp4,rp5,rp6,rp7,rp8,rp9,rp10,rp11,rp12,rp13});
                //ReportParameter rp1 =new ReportParameter("param2", new string[] { null }, false);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.DataSources.Add(datasource7);

                if ((Request.QueryString["Mail"].ToString()) == "Y")
                {

                    string TitleVal = "BuyerOrderReports";
                    string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);

                    string filename = "BuyerOrderReport" + Request.QueryString["ddlOrderNo"].ToString();
                    string FilePath = "~/Uploads/" + TitleVal + "/" + filename + ".pdf";

                    string mimeType, encoding, extension;
                    string[] streamids; Microsoft.Reporting.WebForms.Warning[] warnings;
                    string format = "PDF";
                    byte[] bytes = ReportViewer1.LocalReport.Render(format, "", out mimeType, out encoding, out extension, out streamids, out warnings);
                    //save the pdf byte to the folder
                    //FileStream fs = new FileStream("c:\\report.pdf", FileMode.OpenOrCreate);
                    FileStream fs = new FileStream(Server.MapPath(FilePath), FileMode.OpenOrCreate);
                    byte[] data = new byte[fs.Length];
                    fs.Write(bytes, 0, bytes.Length);
                    fs.Close();

                    Session[filename] = null;
                    Session[filename] = FilePath;

                    var Path = Session[filename].ToString();
                }
                ReportViewer1.LocalReport.Refresh();


            }
        }

        public BuyerOrderSheetDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrderdetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
          
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
          
            sda.SelectCommand = cmd;
            BuyerOrderSheetDataset ds = new BuyerOrderSheetDataset();
            sda.Fill(ds, "BuyerOrderSheetDataset");
            return ds;
        }

        public BuyerOrderSheetstyleDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrderStyle", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
            if (Request.QueryString["Multiopt"] != null)
            {
                cmd.Parameters.Add("@optid", SqlDbType.NVarChar).Value = Request.QueryString["Multiopt"].ToString();
            }
         
            sda.SelectCommand = cmd;
            BuyerOrderSheetstyleDataset ds = new BuyerOrderSheetstyleDataset();
            sda.Fill(ds, "BuyerOrderSheetstyleDataset");
            return ds;
        }

        public BuyerOrderSheetcolsizDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrderColorSize", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            BuyerOrderSheetcolsizDataset ds = new BuyerOrderSheetcolsizDataset();
            sda.Fill(ds, "BuyerOrderSheetcolsizDataset");
            return ds;
        }

        public BuyerOrderHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_BuyerOrderHeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            
            if (Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "BUYER ORDER";// Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            BuyerOrderHeaderDataSet ds = new BuyerOrderHeaderDataSet();
            sda.Fill(ds, "BuyerOrderHeaderDataSet");
            return ds;
        }

        public BuyerOrderShipmentDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBuyerOrderShipmentDet", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            BuyerOrderShipmentDataSet ds = new BuyerOrderShipmentDataSet();
            sda.Fill(ds, "BuyerOrderShipmentDataSet");
            return ds;
        }
        public BuyerOrderPackInlineDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBuyerOrderStyleShipPackWiseColor", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            BuyerOrderPackInlineDataset ds = new BuyerOrderPackInlineDataset();
            sda.Fill(ds, "BuyerOrderPackInlineDataset");
            return ds;
        }
        public BuyerOrdSheetPackListDataset GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBuyerOrderStyleShipPacklistWiseColor", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            BuyerOrdSheetPackListDataset ds = new BuyerOrdSheetPackListDataset();
            sda.Fill(ds, "BuyerOrdSheetPackListDataset");
            return ds;
        }

        public StyleImageDetDataSet GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStyleImgpath", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@Bmasid", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            StyleImageDetDataSet ds = new StyleImageDetDataSet();
            sda.Fill(ds, "StyleImageDetDataSet");

            for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            {
                //for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                //{
                if (ds.Tables[1].Rows[i][0].ToString() != "")
                {
                    string img = ds.Tables[1].Rows[i][0].ToString();
                    string path = new Uri(Server.MapPath(img)).AbsoluteUri;
                    ds.Tables[1].Rows[i][0] = path;
                }
                // }
            }

          

            return ds;
        }



    }
}