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
using System.IO;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;

namespace AxonApparels.ReportInline.Purchase.PurchaseOrderTrimsInlineReport
{
    public partial class PurchaseOrderTrimsInlineReport : System.Web.UI.Page
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
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderReportTrimsInlineDotM.rdlc");
                }
                else
                {
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderReportTrimsInline.rdlc");
                }

               // ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderReportTrimsInline.rdlc");

                this.ReportViewer1.LocalReport.EnableExternalImages = true;

                Img img = GetDataById();
                string path = new Uri(Server.MapPath(img.companyImg)).AbsoluteUri; // adjust path to Project folder here
                string Createpath = new Uri(Server.MapPath(img.CreatedbyImg)).AbsoluteUri;
                string Approvedpath = new Uri(Server.MapPath(img.ApprovedbyImg)).AbsoluteUri; 

                ReportParameter rp1 = new ReportParameter("SecQty", Request.QueryString["SecQty"].ToString());
                ReportParameter rp2 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp3 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
                ReportParameter rp4 = new ReportParameter("Paydet", Request.QueryString["Paydet"].ToString());
                ReportParameter rp5 = new ReportParameter("Baseqty", Request.QueryString["Baseqty"].ToString());
                ReportParameter rp6 = new ReportParameter("Annexure", Request.QueryString["Annexure"].ToString());
                ReportParameter rp7 = new ReportParameter("Splitup", Request.QueryString["Splitup"].ToString());
                ReportParameter rp8 = new ReportParameter("Terms", Request.QueryString["Terms"].ToString());
                ReportParameter rp9 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                ReportParameter rp10 = new ReportParameter("Mfr", Request.QueryString["Mfr"].ToString());
                ReportParameter rp11 = new ReportParameter("Itmcode", Request.QueryString["Itmcode"].ToString());
                ReportParameter rp12 = new ReportParameter("Refno", Request.QueryString["Refno"].ToString());
                ReportParameter rp13 = new ReportParameter("Barcode", Request.QueryString["Barcode"].ToString());
                ReportParameter rp14 = new ReportParameter("Reqdate", Request.QueryString["Reqdate"].ToString());
                ReportParameter rp15 = new ReportParameter("Gst", Request.QueryString["Gst"].ToString());
                ReportParameter rp16 = new ReportParameter("Original", Request.QueryString["Original"].ToString());
                ReportParameter rp17 = new ReportParameter("Duplicate", Request.QueryString["Duplicate"].ToString());
                ReportParameter rp18 = new ReportParameter("Triplicate", Request.QueryString["Triplicate"].ToString());
                ReportParameter rp19 = new ReportParameter("Merchcpy", Request.QueryString["Merchcpy"].ToString());
                ReportParameter rp20 = new ReportParameter("Mdcpy", Request.QueryString["Mdcpy"].ToString());
                ReportParameter rp21 = new ReportParameter("RptOpt", Request.QueryString["RptOpt"].ToString());
                ReportParameter rp22 = new ReportParameter("ImagePath", path);
                ReportParameter rp23 = new ReportParameter("Createpath", Createpath);
                ReportParameter rp24 = new ReportParameter("Approvedpath", Approvedpath);
                ReportParameter rp25 = new ReportParameter("LoginUnit", Request.QueryString["LoginUnit"].ToString());

                PurchaseOrderTrimsMainDataSet ds = GetData();
                PurchaseOrderDetTrimsInlineDataset ds1 = GetData1();
                PurchaseOrderGstTrimsInlineDataSet ds2 = GetData2();
                PurchaseOrderInlineAddlessDataSet ds3 = GetData3();
                PurchaseOrderTrimsMultiRefNoDataSet ds4 = GetData4();
                ReportDataSource datasource = new ReportDataSource("PurchaseOrderTrimsMainStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PurchaseOrderDetTrimsInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PurchaseOrderGstTrimsInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PurchaseOrderInlineAddlessStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PurchaseOrderTrimsMultiRefNoStatement", ds4.Tables[1]);

                string PONo = ds.Tables[1].Rows[0][8].ToString();
                string BarcodeImagePath = "";
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    int bmpwid = PONo.Length * 40;
                    //using (Bitmap bitMap = new Bitmap(PONo.Length * 40, 80))
                    using (Bitmap bitMap = new Bitmap(800, 100))
                    {
                        using (Graphics graphics = Graphics.FromImage(bitMap))
                        {
                            Font oFont = new Font("IDAutomationHC39M", 18);   //IDAutomationHC39M,16  IDAHC39M Code 39 Barcode
                            PointF point = new PointF(2f, 2f);
                            SolidBrush whiteBrush = new SolidBrush(Color.White);
                            //graphics.FillRectangle(whiteBrush, 0, 0, bitMap.Width, bitMap.Height);
                            graphics.FillRectangle(whiteBrush, 0, 0, 800, 100);
                            SolidBrush blackBrush = new SolidBrush(Color.Black);
                            graphics.DrawString("*" + PONo + "*", oFont, blackBrush, point);
                        }
                        bitMap.Save(memoryStream, ImageFormat.Jpeg);
                        //ViewBag.BarcodeImage = "data:image/png;base64," + Convert.ToBase64String(memoryStream.ToArray());

                        BarcodeImagePath = Convert.ToBase64String(memoryStream.ToArray());
                    }
                }

                ReportParameter rp26 = new ReportParameter("BarcodeImagePath", BarcodeImagePath);

                string QRcodeImagePath = "";
                QRcodeImagePath = Convert.ToBase64String(GenerateQrCode(PONo));

                ReportParameter rp27 = new ReportParameter("QRcodeImagePath", QRcodeImagePath);
           
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);          
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);

                DataSet dsMisPath = GetDataMisPath();
                ReportParameter rp28 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
                ReportParameter rp29 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20, rp21, rp22, rp23, rp24, rp25, rp26, rp27, rp28, rp29 });

                if (rpttyp == "M")
                {

                    string TitleVal = "POReports";
                    string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);

                    string filename = "POreport" + Request.QueryString["PurOrdId"].ToString();
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

                    Session["POReportPath"] = null;
                    Session["POReportPath"] = FilePath;
                }

                ReportViewer1.LocalReport.Refresh();
            }
        }

        private byte[] GenerateQrCode(string qrmsg)
        {
            string code = qrmsg;
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeGenerator.QRCode qrCode = qrGenerator.CreateQrCode(code, QRCodeGenerator.ECCLevel.Q);
            //System.Web.UI.WebControls.Image imgBarCode = new System.Web.UI.WebControls.Image();
            //imgBarCode.Height = 150;
            //imgBarCode.Width = 150;
            using (Bitmap bitMap = qrCode.GetGraphic(20))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                    byte[] byteImage = ms.ToArray();
                    return byteImage;
                }
            }
        }

        public DataSet GetDataMisPath()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMisPathDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            sda.SelectCommand = cmd;
            DataSet ds = new DataSet();
            sda.Fill(ds);
            return ds;
        }

        public PurchaseOrderTrimsMainDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdmainlistTrimsInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderTrimsMainDataSet ds = new PurchaseOrderTrimsMainDataSet();
            sda.Fill(ds, "PurchaseOrderTrimsMainDataSet");
            return ds;
        }
        public PurchaseOrderDetTrimsInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderDetTrimsInlineDataset ds = new PurchaseOrderDetTrimsInlineDataset();
            sda.Fill(ds, "PurchaseOrderDetTrimsInlineDataset");

            if (ds.Tables[1].Rows.Count > 0)
            {
                int slno = 0;
               
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        if (Convert.ToInt32(ds.Tables[1].Rows[i][72]) > 1)
                        {
                        ds.Tables[1].Rows[i][53] = 0;
                        ds.Tables[1].Rows[i][68] = 0;
                        ds.Tables[1].Rows[i][69] = 0;
                        ds.Tables[1].Rows[i][70] = 0;
                        }
                      
                        if (Convert.ToInt32(ds.Tables[1].Rows[i][72]) == 1)
                        {
                          ds.Tables[1].Rows[i][72]=   slno +1;
                          slno =Convert.ToInt32(ds.Tables[1].Rows[i][72]);
                        }

                        if (Convert.ToInt32(Request.QueryString["Itmcode"].ToString()) == 0)
                        {
                            
                                ds.Tables[1].Rows[i][50] = "";
                        }

                    }
            }




            return ds;
        }

        public PurchaseOrderGstTrimsInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderGstInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderGstTrimsInlineDataSet ds = new PurchaseOrderGstTrimsInlineDataSet();
            sda.Fill(ds, "PurchaseOrderGstTrimsInlineDataSet");
            return ds;
        }
        public PurchaseOrderInlineAddlessDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrderAddlessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderInlineAddlessDataSet ds = new PurchaseOrderInlineAddlessDataSet();
            sda.Fill(ds, "PurchaseOrderInlineAddlessDataSet");
            return ds;
        }
        public PurchaseOrderTrimsMultiRefNoDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdTrimMultiRefNoInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();

            sda.SelectCommand = cmd;
            PurchaseOrderTrimsMultiRefNoDataSet ds = new PurchaseOrderTrimsMultiRefNoDataSet();
            sda.Fill(ds, "PurchaseOrderTrimsMultiRefNoDataSet");
            return ds;
        }

        public Img GetDataById()
        {
            //return entities.Company.Where(c => c.CompanyId == id).FirstOrDefault();
            //string comp = "";
            Img path = new Img();
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(conString))
            {              
                SqlCommand cmd = new SqlCommand("Proc_Apparel_PurchaseOrdmainlistTrimsInline", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@pur_ord_id", SqlDbType.Int).Value = Request.QueryString["PurOrdId"].ToString();
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    path.companyImg = rdr["Imgpath"].ToString();
                    path.CreatedbyImg = rdr["AppImage"].ToString();
                    path.ApprovedbyImg = rdr["AppbyImage"].ToString();
                }
            }
            return path;
        }
    }

    public class Img {
        public string companyImg { get; set; }
        public string CreatedbyImg { get; set; }
        public string ApprovedbyImg { get; set; }
    }

}