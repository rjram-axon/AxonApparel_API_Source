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

namespace AxonApparels.ReportInline.Production.CuttingOrderReportInline
{
    public partial class CuttingOrdReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/CuttingOrderReportInline/CuttingOrdReportInline.rdlc");
                CuttingOrdMainlistInlineDataSet ds = GetData();
                CuttingOrdOutputInlineDataSet ds1 = GetData1();
                CuttingOrdInputInlineDataSet ds2 = GetData2();
                ReportDataSource datasource = new ReportDataSource("CuttingOrdMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("CuttingOrdOutputInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("CuttingOrdInputInlineStatement", ds2.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportParameter rp2 = new ReportParameter("type", Request.QueryString["type"].ToString());

                string PONo = ds.Tables[1].Rows[0][17].ToString();
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

                ReportParameter rp3 = new ReportParameter("BarcodeImagePath", BarcodeImagePath);

                string QRcodeImagePath = "";
                QRcodeImagePath = Convert.ToBase64String(GenerateQrCode(PONo));

                ReportParameter rp4 = new ReportParameter("QRcodeImagePath", QRcodeImagePath);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);

                DataSet dsMisPath = GetDataMisPath();
                ReportParameter rp5 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
                ReportParameter rp6 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6 });
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

        public CuttingOrdMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CuttingOrderMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CuttingOrdid", SqlDbType.Int).Value = Request.QueryString["CuttingOrdId"];
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
            CuttingOrdMainlistInlineDataSet ds = new CuttingOrdMainlistInlineDataSet();
            sda.Fill(ds, "CuttingOrdMainlistInlineDataSet");
            return ds;
        }
        public CuttingOrdOutputInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CuttingOrderOutputInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CuttingOrdid", SqlDbType.Int).Value = Request.QueryString["CuttingOrdId"];
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
            CuttingOrdOutputInlineDataSet ds = new CuttingOrdOutputInlineDataSet();
            sda.Fill(ds, "CuttingOrdOutputInlineDataSet");
            return ds;
        }
        public CuttingOrdInputInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_CuttingOrderInputInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@CuttingOrdid", SqlDbType.Int).Value = Request.QueryString["CuttingOrdId"];
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
            CuttingOrdInputInlineDataSet ds = new CuttingOrdInputInlineDataSet();
            sda.Fill(ds, "CuttingOrdInputInlineDataSet");
            return ds;
        }
    }
}