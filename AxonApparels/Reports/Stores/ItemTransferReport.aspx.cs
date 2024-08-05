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
using Microsoft.Reporting.WebForms;

namespace AxonApparels.Reports.Stores
{
    public partial class ItemTransferReport : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/Stores/ItemTransferReport.rdlc");
                ItemTranferDataSet ds = GetData();
                //ReportParameter rp1 = new ReportParameter("GroupByView", Request.QueryString["GroupByView"].ToString());
                ReportDataSource datasource = new ReportDataSource("ItemTranferStatement", ds.Tables[1]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(datasource);
                //ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rp1 });
            }
        }
        public ItemTranferDataSet GetData()
        {
            string conString = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;
            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand("Proc_Apparel_ItemTranferReport", con);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@FCmpID", SqlDbType.Int).Value = Request.QueryString["FCmpID"];
            cmd.Parameters.Add("@FItem", SqlDbType.Int).Value = Request.QueryString["FItem"];
            cmd.Parameters.Add("@FColor", SqlDbType.Int).Value = Request.QueryString["FColor"];
            cmd.Parameters.Add("@FSize", SqlDbType.Int).Value = Request.QueryString["FSize"];
            cmd.Parameters.Add("@TItem", SqlDbType.Int).Value = Request.QueryString["TItem"];
            cmd.Parameters.Add("@TColor", SqlDbType.Int).Value = Request.QueryString["TColor"];
            cmd.Parameters.Add("@TSize", SqlDbType.Int).Value = Request.QueryString["TSize"];
            cmd.Parameters.Add("@Ordtyp", SqlDbType.Char, 1).Value = Request.QueryString["Ordtype"].ToString();
            cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar, 50).Value = Request.QueryString["OrdNo"].ToString();
            cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 50).Value = Request.QueryString["RefNo"].ToString();
            cmd.Parameters.Add("@StyId", SqlDbType.Int).Value = Request.QueryString["styleid"];
            cmd.Parameters.Add("@EntNoId", SqlDbType.Int).Value = Request.QueryString["EntryNoId"];
            cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 10).Value = Request.QueryString["FDate"].ToString();
            cmd.Parameters.Add("@todate", SqlDbType.VarChar, 10).Value = Request.QueryString["TDate"].ToString();

            sda.SelectCommand = cmd;
            ItemTranferDataSet ds = new ItemTranferDataSet();
            sda.Fill(ds, "ItemTranferDataSet");
            return ds;
        }
    }
}