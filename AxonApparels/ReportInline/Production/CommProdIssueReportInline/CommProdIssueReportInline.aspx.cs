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
using System.Drawing;
using System.Drawing.Imaging;
using QRCoder;

namespace AxonApparels.ReportInline.Production.CommProdIssueReportInline
{
    public partial class CommProdIssueReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/CommProdIssueReportInline/CommProdIssueReportInline.rdlc");
                ReportParameter rp1 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Bundle", Request.QueryString["Bundle"].ToString());
                ReportParameter rp4 = new ReportParameter("Lotno", Request.QueryString["Lotno"].ToString());
                ReportParameter rp5 = new ReportParameter("Ordrefno", Request.QueryString["Ordrefno"].ToString());
                ReportParameter rp6 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp8 = new ReportParameter("OrdNo", Request.QueryString["OrdNo"].ToString());
                ReportParameter rp9 = new ReportParameter("RefNo", Request.QueryString["RefNo"].ToString());
                ReportParameter rp10 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp7 = new ReportParameter("ImagePath", img);

                CommProdIssMainlistInlineDataSet ds = GetData();
                CommProdIssDetInlineDataSet ds1 = GetData1();
                CommProdIssHeaderDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("CommProdIssMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CommProdIssDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CommProdIssHeaderStatement", ds2.Tables[1]);

                string PONo = ds.Tables[1].Rows[0][0].ToString();
                string BarcodeImagePath = "";
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    int bmpwid = PONo.Length * 40;
                    //using (Bitmap bitMap = new Bitmap(PONo.Length * 40, 80))
                    using (Bitmap bitMap = new Bitmap(bmpwid, 100))
                    {
                        using (Graphics graphics = Graphics.FromImage(bitMap))
                        {
                            Font oFont = new Font("IDAutomationHC39M", 18);   //IDAutomationHC39M,16  IDAHC39M Code 39 Barcode
                            PointF point = new PointF(2f, 2f);
                            SolidBrush whiteBrush = new SolidBrush(Color.White);
                            //graphics.FillRectangle(whiteBrush, 0, 0, bitMap.Width, bitMap.Height);
                            graphics.FillRectangle(whiteBrush, 0, 0, bmpwid, 100);
                            SolidBrush blackBrush = new SolidBrush(Color.Black);
                            graphics.DrawString("*" + PONo + "*", oFont, blackBrush, point);
                        }
                        bitMap.Save(memoryStream, ImageFormat.Jpeg);
                        //ViewBag.BarcodeImage = "data:image/png;base64," + Convert.ToBase64String(memoryStream.ToArray());

                        BarcodeImagePath = Convert.ToBase64String(memoryStream.ToArray());
                    }
                }

                ReportParameter rp11 = new ReportParameter("BarcodeImagePath", BarcodeImagePath);

                string QRcodeImagePath = "";
                QRcodeImagePath = Convert.ToBase64String(GenerateQrCode(PONo));

                ReportParameter rp12 = new ReportParameter("QRcodeImagePath", QRcodeImagePath);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);

                DataSet dsMisPath = GetDataMisPath();
                ReportParameter rp13 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
                ReportParameter rp14 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14 });
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

        public CommProdIssMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdissueMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@ProdIssueId", SqlDbType.Int).Value = Request.QueryString["ProdIssueId"];
           
            sda.SelectCommand = cmd;
            CommProdIssMainlistInlineDataSet ds = new CommProdIssMainlistInlineDataSet();
            sda.Fill(ds, "ProdIssMainlistInlineDataSet");
            return ds;
        }
        public CommProdIssDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CommProdissueInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@ProdIssueId", SqlDbType.Int).Value = Request.QueryString["ProdIssueId"];
           
            sda.SelectCommand = cmd;
            CommProdIssDetInlineDataSet ds = new CommProdIssDetInlineDataSet();
            sda.Fill(ds, "CommProdIssDetInlineDataSet");
            return ds;
        }
        public CommProdIssHeaderDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdIssueId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PRODUCTION ISSUE - EXTERNAL";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            CommProdIssHeaderDataSet ds = new CommProdIssHeaderDataSet();
            sda.Fill(ds, "CommProdIssHeaderDataSet");
            return ds;
        }
    }
}