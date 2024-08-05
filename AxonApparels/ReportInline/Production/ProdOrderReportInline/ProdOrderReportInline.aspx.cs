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

namespace AxonApparels.ReportInline.Production.ProdOrderReportInline
{
    public partial class ProdOrderReportInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Production/ProdOrderReportInline/ProdOrderReportInline.rdlc");


                ReportParameter rp1 = new ReportParameter("InpDet", Request.QueryString["InpDet"].ToString());
                ReportParameter rp2 = new ReportParameter("Ins", Request.QueryString["Ins"].ToString());
                ReportParameter rp3 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());
                ReportParameter rp4 = new ReportParameter("Isssecqty", Request.QueryString["Isssecqty"].ToString());
                ReportParameter rp5 = new ReportParameter("Lotdet", Request.QueryString["Lotdet"].ToString());
                ReportParameter rp6 = new ReportParameter("Ordsecqty", Request.QueryString["Ordsecqty"].ToString());
                ReportParameter rp7 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());

                ReportParameter rp8 = new ReportParameter("Disploc", Request.QueryString["Disploc"].ToString());
                ReportParameter rp9 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
                ReportParameter rp10 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
                ReportParameter rp11 = new ReportParameter("Issloc", Request.QueryString["Issloc"].ToString());
                ReportParameter rp12 = new ReportParameter("Millname", Request.QueryString["Millname"].ToString());
                ReportParameter rp13 = new ReportParameter("Looplen", Request.QueryString["Looplen"].ToString());
                ReportParameter rp14 = new ReportParameter("Gauge", Request.QueryString["Gauge"].ToString());
                ReportParameter rp15 = new ReportParameter("Outno", Request.QueryString["Outno"].ToString());
                ReportParameter rp16 = new ReportParameter("Plandet", Request.QueryString["Plandet"].ToString());
                ReportParameter rp17 = new ReportParameter("Opdet", Request.QueryString["Opdet"].ToString());
                ReportParameter rp18 = new ReportParameter("Ewaybill", Request.QueryString["Ewaybill"].ToString());
                ReportParameter rp19 = new ReportParameter("Ewaydate", Request.QueryString["Ewaydate"].ToString());

                ReportParameter rp20 = new ReportParameter("Refno", Request.QueryString["Refno"].ToString());

                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp21 = new ReportParameter("ImagePath", img);

                ProdOrdMainlistInlineDataSet ds = GetData();
                ProdOrdOutputDetInlineDataSet ds1 = GetData1();
                ProdOrdInputDetInlineDataSet ds2 = GetData2();
                ProdOrdHeaderDataSet ds3 = GetData3();
                ReportDataSource datasource = new ReportDataSource("ProdOrdMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProdOrdOutputDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProdOrdInputDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProdOrdHeaderStatement", ds3.Tables[1]);

                string PONo = ds.Tables[1].Rows[0][9].ToString();
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

                ReportParameter rp22 = new ReportParameter("BarcodeImagePath", BarcodeImagePath);

                string QRcodeImagePath = "";
                QRcodeImagePath = Convert.ToBase64String(GenerateQrCode(PONo));

                ReportParameter rp23 = new ReportParameter("QRcodeImagePath", QRcodeImagePath);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);

                DataSet dsMisPath = GetDataMisPath();
                ReportParameter rp24 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
                ReportParameter rp25 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20, rp21, rp22, rp23, rp24, rp25 });

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

        public ProdOrdMainlistInlineDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdOrderMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@productionordid", SqlDbType.Int).Value = Request.QueryString["ProdOrdId"];
           
            sda.SelectCommand = cmd;
            ProdOrdMainlistInlineDataSet ds = new ProdOrdMainlistInlineDataSet();
            sda.Fill(ds, "ProdOrdMainlistInlineDataSet");
            return ds;
        }
        public ProdOrdOutputDetInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdOrderOutputInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@productionordid", SqlDbType.Int).Value = Request.QueryString["ProdOrdId"];
           
            sda.SelectCommand = cmd;
            ProdOrdOutputDetInlineDataSet ds = new ProdOrdOutputDetInlineDataSet();
            sda.Fill(ds, "ProdOrdOutputDetInlineDataSet");
            return ds;
        }
        public ProdOrdInputDetInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProdOrderInputInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@productionordid", SqlDbType.Int).Value = Request.QueryString["ProdOrdId"];
           
            sda.SelectCommand = cmd;
            ProdOrdInputDetInlineDataSet ds = new ProdOrdInputDetInlineDataSet();
            sda.Fill(ds, "ProdOrdInputDetInlineDataSet");
            return ds;
        }
        public ProdOrdHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["ProdOrdId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS ORDER";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ProdOrdHeaderDataSet ds = new ProdOrdHeaderDataSet();
            sda.Fill(ds, "ProdOrdHeaderDataSet");
            return ds;
        }
    }
}