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

namespace AxonApparels.ReportInline.Process.GeneralProcessOrder
{
    public partial class GeneralProcessOrderInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/GeneralProcessOrder/GeneralProcessOrderInlineReport.rdlc");

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
                ReportParameter rp22 = new ReportParameter("Process", Request.QueryString["Process"].ToString());
                GeneralProcessOrderMainlistDataSet ds = GetData();
                GeneralProcessOrderDetailInlineDataSet ds1 = GetData1();
                GeneralProcessOrderIssueInlineDataSet ds2 = GetData2();
                GeneralProcessOrderHeaderDataSet ds3 = GetData3();
                GeneralProcessOrderGatepassDataSet ds4 = GetData4();
                LoginUnitDataSet ds5 = GetData5();

                ReportDataSource datasource = new ReportDataSource("GeneralProcessOrderMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("GeneralProcessOrderDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("GeneralProcessOrderIssueInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("GeneralProcessOrderHeaderStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("GeneralProcessOrderGatepassStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("LoginUnitStatement", ds5.Tables[1]);

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

                ReportParameter rp23 = new ReportParameter("BarcodeImagePath", BarcodeImagePath);

                string QRcodeImagePath = "";
                QRcodeImagePath = Convert.ToBase64String(GenerateQrCode(PONo));

                ReportParameter rp24 = new ReportParameter("QRcodeImagePath", QRcodeImagePath);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);

                DataSet dsMisPath = GetDataMisPath();
                ReportParameter rp25 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
                ReportParameter rp26 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());

                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20, rp21, rp22, rp23, rp24, rp25, rp26 });

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

        public GeneralProcessOrderMainlistDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessOrderMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessOrderMainlistDataSet ds = new GeneralProcessOrderMainlistDataSet();
            sda.Fill(ds, "GeneralProcessOrderMainlistDataSet");
            return ds;
        }

        public GeneralProcessOrderDetailInlineDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessOrderDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
          
            sda.SelectCommand = cmd;
            GeneralProcessOrderDetailInlineDataSet ds = new GeneralProcessOrderDetailInlineDataSet();
            sda.Fill(ds, "GeneralProcessOrderDetailInlineDataSet");
            return ds;
        }

        public GeneralProcessOrderIssueInlineDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessOrderIssueInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
           
            sda.SelectCommand = cmd;
            GeneralProcessOrderIssueInlineDataSet ds = new GeneralProcessOrderIssueInlineDataSet();
            sda.Fill(ds, "GeneralProcessOrderIssueInlineDataSet");
            return ds;
        }
        public GeneralProcessOrderHeaderDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROCESS ORDER";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            GeneralProcessOrderHeaderDataSet ds = new GeneralProcessOrderHeaderDataSet();
            sda.Fill(ds, "GeneralProcessOrderHeaderDataSet");
            return ds;
        }
        public GeneralProcessOrderGatepassDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GenProcessOrderGatepasslistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            GeneralProcessOrderGatepassDataSet ds = new GeneralProcessOrderGatepassDataSet();
            sda.Fill(ds, "GeneralProcessOrderGatepassDataSet");
            return ds;
        }

        public LoginUnitDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_LoginUnit", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = Request.QueryString["LoginUnit"].ToString();
            sda.SelectCommand = cmd;
            LoginUnitDataSet ds = new LoginUnitDataSet();
            sda.Fill(ds, "LoginUnitDataSet");
            return ds;
        }

    }
}