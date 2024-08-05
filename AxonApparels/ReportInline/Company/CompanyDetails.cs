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
using System.IO;

namespace AxonApparels.ReportInline.Company
{
    public static class CompanyDetails
    {
        public static string  GetCompanyImgpath(int id)
        {
            string Img="";
            string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(connStr))
            {
                
                string sqlQuery = "select * from Company where CompanyId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Img = rdr["Imgpath"].ToString();
                }
            }

            string path = new Uri(System.Web.HttpContext.Current.Server.MapPath(Img)).AbsoluteUri;

            return path;
        }
    }
}