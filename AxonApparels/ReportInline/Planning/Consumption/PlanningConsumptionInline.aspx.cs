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

namespace AxonApparels.ReportInline.Planning.Consumption
{
    public partial class PlanningConsumptionInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;                
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/Consumption/PlanningConsumptionInlineReport.rdlc");


                ReportParameter rp1 = new ReportParameter("shipdet", Request.QueryString["shipdet"].ToString());
                ReportParameter rp2 = new ReportParameter("cutqty", Request.QueryString["cutqty"].ToString());
                ReportParameter rp3 = new ReportParameter("purcs", Request.QueryString["purcs"].ToString());
                ReportParameter rp4 = new ReportParameter("yarndyeprg", Request.QueryString["yarndyeprg"].ToString());
                ReportParameter rp5 = new ReportParameter("Knitprg", Request.QueryString["Knitprg"].ToString());
                ReportParameter rp6 = new ReportParameter("fabdyeprg", Request.QueryString["fabdyeprg"].ToString());
                ReportParameter rp7 = new ReportParameter("printprg", Request.QueryString["printprg"].ToString());
                ReportParameter rp8 = new ReportParameter("trims", Request.QueryString["trims"].ToString());
                ReportParameter rp9 = new ReportParameter("gsm", Request.QueryString["gsm"].ToString());
                ReportParameter rp10 = new ReportParameter("avgntwt", Request.QueryString["avgntwt"].ToString());
                ReportParameter rp11 = new ReportParameter("avggrswt", Request.QueryString["avggrswt"].ToString());
                ReportParameter rp12 = new ReportParameter("allowdet", Request.QueryString["allowdet"].ToString());
                ReportParameter rp13 = new ReportParameter("ordno", Request.QueryString["ordno"].ToString());
                ReportParameter rp14 = new ReportParameter("knitprgdet", Request.QueryString["knitprgdet"].ToString());
                ReportParameter rp15 = new ReportParameter("fabprg", Request.QueryString["fabprg"].ToString());
                ReportParameter rp16 = new ReportParameter("fabwash", Request.QueryString["fabwash"].ToString());
                ReportParameter rp18 = new ReportParameter("Viewsize", Request.QueryString["Viewsize"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp17 = new ReportParameter("ImagePath", img);

                PlanningConsumInlinDataset ds = GetData();
                PlanningConsumYarnFabPurchaseInlineDataset ds1 = GetData1();
                PlanningConsumYarnFabPerInlineDataset ds2 = GetData2();
                PlanningConsumDetInlineDataset ds3 = GetData3();
                ConsumptionHeaderDetDataSet ds4 = GetData4();

                ReportDataSource datasource = new ReportDataSource("PlanningConsumInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningConsumYarnFabPurchaseInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanningConsumYarnFabPerInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanningConsumDetInlineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("ConsumptionHeaderDetStatement", ds4.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18 });
            }
        }
        public PlanningConsumInlinDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsumptionMainlistInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure; 

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
           
            sda.SelectCommand = cmd;
            PlanningConsumInlinDataset ds = new PlanningConsumInlinDataset();
            sda.Fill(ds, "PlanningConsumInlinDataset");

            if (ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    if ((ds.Tables[1].Rows[i][29].ToString()) != "")
                    {
                        string path = new Uri(Server.MapPath((ds.Tables[1].Rows[i][29].ToString()))).AbsoluteUri;
                        ds.Tables[1].Rows[i][29] = path;
                    }
                }
            }


            return ds;
        }
        public PlanningConsumYarnFabPurchaseInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConYarnFabPurchaseInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningConsumYarnFabPurchaseInlineDataset ds = new PlanningConsumYarnFabPurchaseInlineDataset();
            sda.Fill(ds, "PlanningConsumYarnFabPurchaseInlineDataset");
            return ds;
        }
        public PlanningConsumYarnFabPerInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConYarnFabPurchasePerInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningConsumYarnFabPerInlineDataset ds = new PlanningConsumYarnFabPerInlineDataset();
            sda.Fill(ds, "PlanningConsumYarnFabPerInlineDataset");
            return ds;
        }
        public PlanningConsumDetInlineDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConsumptionDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }
            if ( Request.QueryString["Viewsize"] != null)
            {
                cmd.Parameters.Add("@Sizegroup", SqlDbType.Int).Value = Request.QueryString["Viewsize"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningConsumDetInlineDataset ds = new PlanningConsumDetInlineDataset();
            sda.Fill(ds, "PlanningConsumDetInlineDataset");


            if (ds.Tables[1].Rows.Count > 0)
            {
                if (Request.QueryString["Viewsize"].ToString() == "0")
                {
                    for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                    {
                        ds.Tables[1].Rows[i][10] = "";
                    }
                }

            }

            return ds;
        }
        public ConsumptionHeaderDetDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "CONSUMPTION";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            ConsumptionHeaderDetDataSet ds = new ConsumptionHeaderDetDataSet();
            sda.Fill(ds, "ConsumptionHeaderDetDataSet");
            return ds;
        }
    }
}