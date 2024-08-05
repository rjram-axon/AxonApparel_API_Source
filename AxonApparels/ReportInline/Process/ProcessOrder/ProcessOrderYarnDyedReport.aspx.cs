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
using AxonApparels.ReportInline.Company;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using QRCoder;

namespace AxonApparels.ReportInline.Process.ProcessOrder
{
    public partial class ProcessOrderYarnDyedReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            string rpttyp = Request.QueryString["RptTyp"].ToString();
            if (rpttyp == "R")
            {
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReportDotM.rdlc");
            }
            else
            {
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.rdlc");
            }

            //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.rdlc");
            ReportParameter rp1 = new ReportParameter("ProcessName", Request.QueryString["ProcessName"].ToString());
            ReportParameter rp2 = new ReportParameter("OrdNo", Request.QueryString["OrdNo"].ToString());
            ReportParameter rp3 = new ReportParameter("RefNo", Request.QueryString["RefNo"].ToString());
            ReportParameter rp4 = new ReportParameter("Style", Request.QueryString["Style"].ToString());
            ReportParameter rp5 = new ReportParameter("Gauge", Request.QueryString["Gauge"].ToString());
            ReportParameter rp6 = new ReportParameter("Looplen", Request.QueryString["Looplen"].ToString());
            ReportParameter rp7 = new ReportParameter("Gatepass", Request.QueryString["Gatepass"].ToString());

            ReportParameter rp8 = new ReportParameter("Isssecqty", Request.QueryString["Isssecqty"].ToString());
            ReportParameter rp9 = new ReportParameter("Ordsecqty", Request.QueryString["Ordsecqty"].ToString());
            ReportParameter rp10 = new ReportParameter("Rem", Request.QueryString["Rem"].ToString());
            ReportParameter rp11 = new ReportParameter("Disploc", Request.QueryString["Disploc"].ToString());
            ReportParameter rp12 = new ReportParameter("Rate", Request.QueryString["Rate"].ToString());
            ReportParameter rp13 = new ReportParameter("Amnt", Request.QueryString["Amnt"].ToString());
            ReportParameter rp14 = new ReportParameter("Issloc", Request.QueryString["Issloc"].ToString());

            ReportParameter rp15 = new ReportParameter("Millname", Request.QueryString["Millname"].ToString());
          
            ReportParameter rp16 = new ReportParameter("Outno", Request.QueryString["Outno"].ToString());
            ReportParameter rp17 = new ReportParameter("Plandet", Request.QueryString["Plandet"].ToString());
            ReportParameter rp18 = new ReportParameter("Opdet", Request.QueryString["Opdet"].ToString());
          

            this.ReportViewer1.LocalReport.EnableExternalImages = true;
            int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
            string img = CompanyDetails.GetCompanyImgpath(Companyid);
            ReportParameter rp19 = new ReportParameter("ImagePath", img);

            Img image = GetDataById();
            string Createpath = "";
            string Approvedpath = "";
            if (image.CreatedbyImg != "")
            {
                Createpath = new Uri(Server.MapPath(image.CreatedbyImg)).AbsoluteUri;
            }
            if (image.ApprovedbyImg != "") {
                Approvedpath = new Uri(Server.MapPath(image.ApprovedbyImg)).AbsoluteUri;
            }
            ReportParameter rp20 = new ReportParameter("Createpath", Createpath);
            ReportParameter rp21 = new ReportParameter("Approvedpath", Approvedpath);
            ReportParameter rp22 = new ReportParameter("LoginUnit", Request.QueryString["LoginUnit"].ToString());

            ProcessOrdYarnDyedMainlistDataSet ds = GetData();
            ProcessOrdYarnDyedDetailDataSet ds1 = GetData1();
            ProcessOrderYarnDyeIssDataSet ds2 = GetData2();
            ProcessOrdYarnOutDataSet ds3 = GetData3();
            ProcessOrdOutDetailDataSet ds4 = GetData4();
            ProcessOrdIssueDetailDataSet ds5 = GetData5();
            LoginUnitDataSet ds6 = GetData6();
            ReportDataSource datasource = new ReportDataSource("ProcessOrdMainListYarnDyedStatement", ds.Tables[1]);
            ReportDataSource datasource1 = new ReportDataSource("ProcessOrdYarnDyedDetailStatement", ds1.Tables[1]);
            ReportDataSource datasource2 = new ReportDataSource("ProcessOrderYarnDyeIssStatement", ds2.Tables[1]);
            ReportDataSource datasource3 = new ReportDataSource("ProcessOrdYarnOutStatement", ds3.Tables[1]);
            ReportDataSource datasource4 = new ReportDataSource("ProcessOrdOutDetailStatement", ds4.Tables[1]);
            ReportDataSource datasource5 = new ReportDataSource("ProcessOrdIssueDetailStatement", ds5.Tables[1]);
            ReportDataSource datasource6 = new ReportDataSource("LoginUnitStatement", ds6.Tables[1]);

            string PONo = ds.Tables[1].Rows[0][31].ToString();
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
            ReportViewer1.LocalReport.DataSources.Add(datasource6);

            DataSet dsMisPath = GetDataMisPath();
            ReportParameter rp25 = new ReportParameter("IsBarcodeVisible", dsMisPath.Tables[0].Rows[0]["chkBarcode"].ToString());
            ReportParameter rp26 = new ReportParameter("IsQRcodeVisible", dsMisPath.Tables[0].Rows[0]["chkQRcode"].ToString());
            ReportParameter rp27 = new ReportParameter("Buyer", Request.QueryString["Buyer"].ToString());
            ReportParameter rp28 = new ReportParameter("ShowRefno", Request.QueryString["ShowRefno"].ToString());

            ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20, rp21, rp22, rp23, rp24, rp25, rp26, rp27, rp28 });

            string TitleVal = "ProcessDCReports";
            string appPath = AppDomain.CurrentDomain.BaseDirectory;
            DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);

            string filename = "ProcessDCReports" + Request.QueryString["Masid"].ToString();
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
            ReportViewer1.LocalReport.Refresh();

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

        public ProcessOrdYarnDyedMainlistDataSet GetData()
        {

            string UserGroup = GetUserGroup();

            string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            if (Group != "AUDIT")
            {

                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);


                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeMainlistInline", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

                sda.SelectCommand = cmd;
                ProcessOrdYarnDyedMainlistDataSet ds = new ProcessOrdYarnDyedMainlistDataSet();
                sda.Fill(ds, "ProcessOrdYarnDyedMainlistDataSet");
                return ds;
            }
            else {
                string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
                con = new SqlConnection(conString);


                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeMainlistInlineAudit", con);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

                sda.SelectCommand = cmd;
                ProcessOrdYarnDyedMainlistDataSet ds = new ProcessOrdYarnDyedMainlistDataSet();
                sda.Fill(ds, "ProcessOrdYarnDyedMainlistDataSet");
                return ds;
            }
        }

        public ProcessOrdYarnDyedDetailDataSet GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyedDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrdYarnDyedDetailDataSet ds = new ProcessOrdYarnDyedDetailDataSet();
            sda.Fill(ds, "ProcessOrdYarnDyedDetailDataSet");
            return ds;
        }
        public ProcessOrderYarnDyeIssDataSet GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeIssueDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderYarnDyeIssDataSet ds = new ProcessOrderYarnDyeIssDataSet();
            sda.Fill(ds, "ProcessOrderYarnDyeIssDataSet");
            return ds;
        }
        public ProcessOrdYarnOutDataSet GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrdYarnOutDataSet ds = new ProcessOrdYarnOutDataSet();
            sda.Fill(ds, "ProcessOrdYarnOutDataSet");
            return ds;
        }
        public ProcessOrdOutDetailDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrdOutDetailDataSet ds = new ProcessOrdOutDetailDataSet();
            sda.Fill(ds, "ProcessOrdOutDetailDataSet");
            return ds;
        }
        public ProcessOrdIssueDetailDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeIssueDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrdIssueDetailDataSet ds = new ProcessOrdIssueDetailDataSet();
            sda.Fill(ds, "ProcessOrdIssueDetailDataSet");
            return ds;
        }
        public LoginUnitDataSet GetData6()
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

        public Img GetDataById()
        {
            //return entities.Company.Where(c => c.CompanyId == id).FirstOrDefault();
            //string comp = "";
            Img path = new Img();
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDyeMainlistInline", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    path.CreatedbyImg = rdr["CreateImgpath"].ToString();
                    path.ApprovedbyImg = rdr["ApprovedImgpath"].ToString();
                }
            }
            return path;
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
    public class Img
    {
        public string companyImg { get; set; }
        public string CreatedbyImg { get; set; }
        public string ApprovedbyImg { get; set; }
    }

}