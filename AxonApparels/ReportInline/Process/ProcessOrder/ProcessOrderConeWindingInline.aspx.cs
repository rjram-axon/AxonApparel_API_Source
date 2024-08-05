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

namespace AxonApparels.ReportInline.Process.ProcessOrder
{
    public partial class ProcessOrderConeWindingInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.rdlc");

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

                ProcessOrderMainListConeWindingDataset ds = GetData();
                ProcessOrderDetailInlineDataset ds1 = GetData1();
                ProcessOrderIssDetInlineDataset ds2 = GetData2();
                ProcessOrderHeaderDataSet ds3 = GetData3();
                ProcessOrderGatepassDataSet ds4 = GetData4();
                ProcessOrderRefNoConeWindingDataset ds5 = GetData5();
                ProcessOrderYarnDetDataset ds6 = GetData6();

                ReportDataSource datasource = new ReportDataSource("ProcessOrderMainConeWindingStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("ProcessOrderDetailInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("ProcessOrderIssDetInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("ProcessOrderHeaderStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("ProcessOrderGatepassStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("ProcessOrderRefNoStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("ProcessOrderYarnDetailInlineStatement", ds6.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19, rp20 });

            }
        }

        public ProcessOrderMainListConeWindingDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderMainlistConeWindingInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderMainListConeWindingDataset ds = new ProcessOrderMainListConeWindingDataset();
            sda.Fill(ds, "ProcessOrderMainListConeWindingDataset");
            return ds;
        }

        public ProcessOrderDetailInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderDetailInlineDataset ds = new ProcessOrderDetailInlineDataset();
            sda.Fill(ds, "ProcessOrderDetailInlineDataset");
            return ds;
        }

        public ProcessOrderYarnDetDataset GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderYarnDetailInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderYarnDetDataset ds = new ProcessOrderYarnDetDataset();
            sda.Fill(ds, "ProcessOrderYarnDetDataset");
            return ds;
        }

        public ProcessOrderIssDetInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderIssueDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderIssDetInlineDataset ds = new ProcessOrderIssDetInlineDataset();
            sda.Fill(ds, "ProcessOrderIssDetInlineDataset");
            return ds;
        }
        public ProcessOrderHeaderDataSet GetData3()
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
            ProcessOrderHeaderDataSet ds = new ProcessOrderHeaderDataSet();
            sda.Fill(ds, "ProcessOrderHeaderDataSet");
            return ds;
        }
        public ProcessOrderGatepassDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderGatepasslistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderGatepassDataSet ds = new ProcessOrderGatepassDataSet();
            sda.Fill(ds, "ProcessOrderGatepassDataSet");
            return ds;
        }

        public ProcessOrderRefNoConeWindingDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessOrderRefnoConeWindingInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Request.QueryString["Masid"].ToString();

            sda.SelectCommand = cmd;
            ProcessOrderRefNoConeWindingDataset ds = new ProcessOrderRefNoConeWindingDataset();
            sda.Fill(ds, "ProcessOrderRefNoConeWindingDataset");
            return ds;
        }
    }
}