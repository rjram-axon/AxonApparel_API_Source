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

namespace AxonApparels.ReportInline.Planning.ProgramSummary
{
    public partial class PlanningProgramSummaryInline : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportInline/Planning/ProgramSummary/PlanningProgrmSummaryInlineReport.rdlc");


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
                ReportParameter rp18 = new ReportParameter("ProdPrg", Request.QueryString["ProdPrg"].ToString());
                ReportParameter rp19 = new ReportParameter("ProcPrg", Request.QueryString["ProcPrg"].ToString());
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp17 = new ReportParameter("ImagePath", img);

                PlanningProgSumInlineDataset ds = GetData();
                PlanningProgSumDetInlineDataset ds1 = GetData1();
                PlanningPrgShipInlineDataset ds2 = GetData2();
                PlanningPrgYarnFabInineDataset ds3 = GetData3();
                PlanningPrgknitInlineDataSet ds4 = GetData4();
                PlanningPrgFabDyeInlineDataSet ds5 = GetData5();
                PlanningPrgAllProgInlineDataset ds6 = GetData6();
                PlanningPrgAvgNetInlineDataset ds7 = GetData7();
                HeaderDetDataSet ds8 = GetData8();
                PlanningPrgTrimsInineDataSet ds9 = GetData9();
                PlanStyleImageDetDataSet ds10 = GetData10();
                PlanningPrgAllProcessProgInlineDataSet ds11 = GetData11();
                PlanningPrgProdKnitFabricInlineDataSet ds12 = GetData12();

                ReportDataSource datasource = new ReportDataSource("PlanningProgSumInlineStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("PlanningProgSumDetInlineStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("PlanningPrgShipInlineStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("PlanningPrgYarnFabInineStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("PlanningPrgknitInlineStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("PlanningPrgFabDyeInlineStatement", ds5.Tables[1]);
                ReportDataSource datasource6 = new ReportDataSource("PlanningPrgAllProgInlineStatement", ds6.Tables[1]);
                ReportDataSource datasource7 = new ReportDataSource("PlanningPrgAvgNetInlineStatement", ds7.Tables[1]);
                ReportDataSource datasource8 = new ReportDataSource("HeaderDetStatement", ds8.Tables[1]);
                ReportDataSource datasource9 = new ReportDataSource("PlanningPrgTrimsInineStatement", ds9.Tables[1]);
                ReportDataSource datasource10 = new ReportDataSource("PlanStyleImageDetStatement", ds10.Tables[1]);
                ReportDataSource datasource11 = new ReportDataSource("PlanningPrgAllProcessProgInlineStatement", ds11.Tables[1]);
                ReportDataSource datasource12 = new ReportDataSource("PlanningPrgProdKnitFabricInlineStatement", ds12.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);
                ReportViewer1.LocalReport.DataSources.Add(datasource6);
                ReportViewer1.LocalReport.DataSources.Add(datasource7);
                ReportViewer1.LocalReport.DataSources.Add(datasource8);
                ReportViewer1.LocalReport.DataSources.Add(datasource9);
                ReportViewer1.LocalReport.DataSources.Add(datasource10);
                ReportViewer1.LocalReport.DataSources.Add(datasource11);
                ReportViewer1.LocalReport.DataSources.Add(datasource12);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1, rp2, rp3, rp4, rp5, rp6, rp7, rp8, rp9, rp10, rp11, rp12, rp13, rp14, rp15, rp16, rp17, rp18, rp19 });

           

            }
        }
        public PlanningProgSumInlineDataset GetData()
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
            PlanningProgSumInlineDataset ds = new PlanningProgSumInlineDataset();
            sda.Fill(ds, "PlanningProgSumInlineDataset");
            return ds;
        }
        public PlanningProgSumDetInlineDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningProgSumDetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningProgSumDetInlineDataset ds = new PlanningProgSumDetInlineDataset();
            sda.Fill(ds, "PlanningProgSumDetInlineDataset");
            return ds;
        }
        public PlanningPrgShipInlineDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgShipInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgShipInlineDataset ds = new PlanningPrgShipInlineDataset();
            sda.Fill(ds, "PlanningPrgShipInlineDataset");
            return ds;
        }
        public PlanningPrgYarnFabInineDataset GetData3()
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
            PlanningPrgYarnFabInineDataset ds = new PlanningPrgYarnFabInineDataset();
            sda.Fill(ds, "PlanningPrgYarnFabInineDataset");
            return ds;
        }
        public PlanningPrgknitInlineDataSet GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgProdKnitInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgknitInlineDataSet ds = new PlanningPrgknitInlineDataSet();
            sda.Fill(ds, "PlanningPrgknitInlineDataSet");
            return ds;
        }
        public PlanningPrgFabDyeInlineDataSet GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgProdFabDyeInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgFabDyeInlineDataSet ds = new PlanningPrgFabDyeInlineDataSet();
            sda.Fill(ds, "PlanningPrgFabDyeInlineDataSet");
            return ds;
        }
        public PlanningPrgAllProgInlineDataset GetData6()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgProdPrgAllInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgAllProgInlineDataset ds = new PlanningPrgAllProgInlineDataset();
            sda.Fill(ds, "PlanningPrgAllProgInlineDataset");
            return ds;
        }

        public PlanningPrgAllProcessProgInlineDataSet GetData11()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgProcessPrgAllInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgAllProcessProgInlineDataSet ds = new PlanningPrgAllProcessProgInlineDataSet();
            sda.Fill(ds, "PlanningPrgAllProcessProgInlineDataSet");
            return ds;
        }

        public PlanningPrgAvgNetInlineDataset GetData7()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgAvgNetInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgAvgNetInlineDataset ds = new PlanningPrgAvgNetInlineDataset();
            sda.Fill(ds, "PlanningPrgAvgNetInlineDataset");
            return ds;
        }

        public HeaderDetDataSet GetData8()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_HeaderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@doctitle", SqlDbType.NVarChar).Value = "PROGRAM SUMMARY";// Request.QueryString["ddlOrderNo"].ToString();
            }

            sda.SelectCommand = cmd;
            HeaderDetDataSet ds = new HeaderDetDataSet();
            sda.Fill(ds, "HeaderDetDataSet");
            return ds;
        }
        public PlanningPrgTrimsInineDataSet GetData9()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningConTrimsPurchaseInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgTrimsInineDataSet ds = new PlanningPrgTrimsInineDataSet();
            sda.Fill(ds, "PlanningPrgTrimsInineDataSet");
            return ds;
        }

        public PlanStyleImageDetDataSet GetData10()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanStyleImgpath", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyleRowid", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanStyleImageDetDataSet ds = new PlanStyleImageDetDataSet();
            sda.Fill(ds, "PlanStyleImageDetDataSet");

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


        public PlanningPrgProdKnitFabricInlineDataSet GetData12()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_PlanningPrgProdKnitFabricInline", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;

            if (Convert.ToInt32(Request.QueryString["StyRowId"]) > 0 && Request.QueryString["StyRowId"] != null)
            {
                cmd.Parameters.Add("@StyRowId", SqlDbType.Int).Value = Request.QueryString["StyRowId"].ToString();
            }

            sda.SelectCommand = cmd;
            PlanningPrgProdKnitFabricInlineDataSet ds = new PlanningPrgProdKnitFabricInlineDataSet();
            sda.Fill(ds, "PlanningPrgProdKnitFabricInlineDataSet");
            return ds;
        }


    }
}