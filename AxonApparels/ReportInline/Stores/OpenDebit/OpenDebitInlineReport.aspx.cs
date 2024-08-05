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
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace AxonApparels.ReportInline.Stores.OpenDebit
{
    public partial class OpenDebitInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string rpttyp = Request.QueryString["RptTyp"].ToString();
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Stores/OpenDebit/OpenDebitInlineReport.rdlc");
                OpenDebitMainlistInlineDataset ds = GetData();
                OpenDebitDetailInlineDataset ds1 = GetData1();
                OpenDebitAddlessInlineDataset ds2 = GetData2();
                OpenDebitGatePassInlineDataset ds3 = GetData3();
                OpenDebitHeaderDataSet ds4 = GetData4();
                ReportDataSource datasource = new ReportDataSource("OpenDebitMainlistInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("OpenDebitDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("OpenDebitAddLessInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("OpenDebitGatePassInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("OpenDebitHeaderStatement", ds4.Tables[1]);
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });

                if (rpttyp == "M")
                {
                    string TitleVal = "OpenDebit_Reports";
                    string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);

                    string filename = "OpenDebit_Report" + Request.QueryString["Masid"].ToString();
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

        public OpenDebitMainlistInlineDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpenDebitMainListInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
            
            sda.SelectCommand = cmd;
            OpenDebitMainlistInlineDataset ds = new OpenDebitMainlistInlineDataset();
            sda.Fill(ds, "OpenDebitMainlistInlineDataset");
            return ds;
        }

        public OpenDebitDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpenDebitDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            OpenDebitDetailInlineDataset ds = new OpenDebitDetailInlineDataset();
            sda.Fill(ds, "OpenDebitDetailInlineDataset");
            return ds;
        }

        public OpenDebitAddlessInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpenDebitAddLessInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
            
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
          
            sda.SelectCommand = cmd;
            OpenDebitAddlessInlineDataset ds = new OpenDebitAddlessInlineDataset();
            sda.Fill(ds, "OpenDebitAddlessInlineDataset");
            return ds;
        }
        public OpenDebitGatePassInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_OpenDebitGatePassInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"];
           
            if (Convert.ToInt32(Request.QueryString["ddlOrderNo"]) > 0 && Request.QueryString["ddlOrderNo"] != null)
            {
                cmd.Parameters.Add("@BuyOrdMasID", SqlDbType.Int).Value = Request.QueryString["ddlOrderNo"].ToString();
            }
           
            sda.SelectCommand = cmd;
            OpenDebitGatePassInlineDataset ds = new OpenDebitGatePassInlineDataset();
            sda.Fill(ds, "OpenDebitGatePassInlineDataset");
            return ds;
        }
        public OpenDebitHeaderDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["Masid"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "OPEN DEBIT NOTE";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            OpenDebitHeaderDataSet ds = new OpenDebitHeaderDataSet();
            sda.Fill(ds, "OpenDebitHeaderDataSet");
            return ds;
        }

      

    }


}

