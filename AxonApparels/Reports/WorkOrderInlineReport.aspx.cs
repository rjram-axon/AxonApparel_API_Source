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

namespace AxonApparels.Reports
{
    public partial class WorkOrderInlineReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/WorkOrderInlineReport.rdlc");
                WorkOrderDetailsDataset ds = GetData();
                WorkOrderStyleDataset ds1 = GetData1();
                WorkOrderColSizDataset ds2 = GetData2();
                WorkOrderPlanSummDataset ds3 = GetData3();
                WorkOrderColorDataset ds4 = GetData4();
                WorkColorAssortDataset ds5 = GetData5();
                this.ReportViewer1.LocalReport.EnableExternalImages = true;
                int Companyid = Int32.Parse(Request.QueryString["Companyid"]);
                string img = CompanyDetails.GetCompanyImgpath(Companyid);
                ReportParameter rp1 = new ReportParameter("ImagePath", img);

                ReportDataSource datasource = new ReportDataSource("WorkOrderDetailsStatement", ds.Tables[1]);
                ReportDataSource datasource1 = new ReportDataSource("WorkOrderStyleStatement", ds1.Tables[1]);
                ReportDataSource datasource2 = new ReportDataSource("WorkOrderColSizStatement", ds2.Tables[1]);
                ReportDataSource datasource3 = new ReportDataSource("WorkOrderPlanSummStatement", ds3.Tables[1]);
                ReportDataSource datasource4 = new ReportDataSource("WorkOrderColorStatement", ds4.Tables[1]);
                ReportDataSource datasource5 = new ReportDataSource("WorkColorAssortStatement", ds5.Tables[1]);

                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                ReportViewer1.LocalReport.DataSources.Add(datasource1);
                ReportViewer1.LocalReport.DataSources.Add(datasource2);
                ReportViewer1.LocalReport.DataSources.Add(datasource3);
                ReportViewer1.LocalReport.DataSources.Add(datasource4);
                ReportViewer1.LocalReport.DataSources.Add(datasource5);

                ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(WorkOrdColorSubReport);
                ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(WorkOrdAssortColorSubReport);
                ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        void WorkOrdColorSubReport(object sender, SubreportProcessingEventArgs e)
        {
            int JobId = int.Parse(e.Parameters["JobOrdMasID"].Values[0].ToString());
            string ShipNo = e.Parameters["ShipNo"].Values[0].ToString();
            DataTable WorkColor = GetWorkColor(JobId, ShipNo);
            ReportDataSource ds = new ReportDataSource("WorkColorDataset", WorkColor);
            e.DataSources.Add(ds);
            // GetData4();
        }
        void WorkOrdAssortColorSubReport(object sender, SubreportProcessingEventArgs e)
        {
            int JobId = int.Parse(e.Parameters["JobOrdMasID"].Values[0].ToString());
            string ShipNo = e.Parameters["ShipNo"].Values[0].ToString();
            DataTable WorkAssortColor = GetWorkAssortColor(JobId, ShipNo);
            ReportDataSource ds = new ReportDataSource("WorkColorAssortDataset", WorkAssortColor);
            e.DataSources.Add(ds);

        }

        private DataTable GetWorkColor(int JobId, string ShipNo)
        {
            DataTable dt = new DataTable();
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            //con = new SqlConnection(conString);
            using (SqlConnection cn = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderColWiseQuantity", cn);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
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
                if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
                {
                    cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = JobId;
                }
                cmd.Parameters.Add("@ShipNo", SqlDbType.VarChar).Value = ShipNo;
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
                //sda.SelectCommand = cmd;
                //WorkColorDataset ds = new WorkOrderDetailsDataset();
                //sda.Fill(ds, "WorkOrderDetailsDataset");
                //return ds;
                cn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    dt.Load(reader);
                }
            }
            return dt;
        }

        private DataTable GetWorkAssortColor(int JobId, string ShipNo)
        {
            DataTable dt = new DataTable();
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            //con = new SqlConnection(conString);
            using (SqlConnection cn = new SqlConnection(conString))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderColWiseAssortQuantity", cn);
                SqlDataAdapter sda = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
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
                if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
                {
                    cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = JobId;
                }
                cmd.Parameters.Add("@ShipNo", SqlDbType.VarChar).Value = ShipNo;
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
                //sda.SelectCommand = cmd;
                //WorkColorDataset ds = new WorkOrderDetailsDataset();
                //sda.Fill(ds, "WorkOrderDetailsDataset");
                //return ds;
                cn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    dt.Load(reader);
                }
            }
            return dt;
        }

        public WorkOrderDetailsDataset GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderDetails", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
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
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
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
            WorkOrderDetailsDataset ds = new WorkOrderDetailsDataset();
            sda.Fill(ds, "WorkOrderDetailsDataset");
            return ds;
        }

        public WorkOrderStyleDataset GetData1()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderStyle", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
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
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
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
            WorkOrderStyleDataset ds = new WorkOrderStyleDataset();
            sda.Fill(ds, "WorkOrderStyleDataset");
            return ds;
        }

        public WorkOrderColSizDataset GetData2()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderColSiz", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
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
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
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
            WorkOrderColSizDataset ds = new WorkOrderColSizDataset();
            sda.Fill(ds, "WorkOrderColSizDataset");
            return ds;
        }


        public WorkColorAssortDataset GetData5()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderColWiseAssortQuantity", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
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
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
            //cmd.Parameters.Add("@ShipNo", SqlDbType.VarChar).Value = "SH-00018";

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
            WorkColorAssortDataset ds = new WorkColorAssortDataset();
            sda.Fill(ds, "WorkColorAssortDataset");
            return ds;
        }
        public WorkOrderPlanSummDataset GetData3()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("sp_PlanningSummaryRpt", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
            //cmd.Parameters.Add("@BuyOrJob", SqlDbType.VarChar).Value = "W";
            //cmd.Parameters.Add("@joborderno", SqlDbType.Int).Value = "AXN-WRK1819-00002";
            //cmd.Parameters.Add("@BuyOrderNo", SqlDbType.Int).Value = "AXN-ION1819-00002";
            //if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            //{
            //    cmd.Parameters.Add("@joborderno", SqlDbType.Int).Value = Request.QueryString["joborderno"].ToString();
            //}
            //if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            //{
            //    cmd.Parameters.Add("@BuyOrderNo", SqlDbType.Int).Value = Request.QueryString["BuyOrderNo"].ToString();
            //}            
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
            WorkOrderPlanSummDataset ds = new WorkOrderPlanSummDataset();
            sda.Fill(ds, "WorkOrderPlanSummDataset");
            return ds;
        }
        public WorkOrderColorDataset GetData4()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_WorkOrderColWiseQuantity", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            {
                cmd.Parameters.Add("@JobOrdMasID", SqlDbType.Int).Value = Request.QueryString["JobOrderID"].ToString();
            }
            cmd.Parameters.Add("@ShipNo", SqlDbType.VarChar).Value = "SH-00018";
            //cmd.Parameters.Add("@joborderno", SqlDbType.Int).Value = "AXN-WRK1819-00002";
            //cmd.Parameters.Add("@BuyOrderNo", SqlDbType.Int).Value = "AXN-ION1819-00002";
            //if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            //{
            //    cmd.Parameters.Add("@joborderno", SqlDbType.Int).Value = Request.QueryString["joborderno"].ToString();
            //}
            //if (Convert.ToInt32(Request.QueryString["JobOrderID"]) > 0 && Request.QueryString["JobOrderID"] != null)
            //{
            //    cmd.Parameters.Add("@BuyOrderNo", SqlDbType.Int).Value = Request.QueryString["BuyOrderNo"].ToString();
            //}            
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
            WorkOrderColorDataset ds = new WorkOrderColorDataset();
            sda.Fill(ds, "WorkOrderColorWiseQuantityDataset");
            return ds;
        }

    }
}