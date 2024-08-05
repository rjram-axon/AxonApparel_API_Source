using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Web;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparel.Repository
{

    public class DBbackupRepository : IDBbackupRepository
    {

        HouseKeepingEntities entities = new HouseKeepingEntities();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;


        SqlConnectionStringBuilder SSB = new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);



        public bool UpdateShrinkDetData()
        {

            bool reserved = false;
            string dbname = "";

            try
            {

                using (SqlConnection con = new SqlConnection(connStr))
                {

                    dbname = con.Database;

                    using (SqlCommand cmd = new SqlCommand("Proc_Apparel_DbShrink", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@Dbname", SqlDbType.VarChar).Value = dbname;

                        con.Open();
                        cmd.ExecuteNonQuery();
                    }

                }
                reserved = true;
            }
            catch (Exception ex)
            {
                // txscope.Dispose();
            }
            return reserved;
        }


        public bool UpdateBackUpDetData()
        {

            //DBBackupFileName = Database_Name & Format(GetServerDate(cn), "MM-dd-yyyy") & ".bak";


            //throw new NotImplementedException();
            bool reserved = false;
            string dbname = "";
            string AppPath = "";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {

                    dbname = con.Database;
                    DateTime dt = DateTime.Now;
                    string strDate = dt.ToString("MM/dd/yyyy");

                    string dbbackname = dbname + strDate + ".bak";

                    var OQuery = entities.MisPath.FirstOrDefault();
                    if (OQuery != null)
                    {
                        AppPath = OQuery.ApplicationPath;
                    }

                        using (SqlConnection con1 = new SqlConnection(connStr))
                        {

                            dbname = con1.Database;

                            using (SqlCommand cmd = new SqlCommand("proc_Apparel_AutoDbBackup", con1))
                            {
                                try
                                {
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.Add("@FilePath", SqlDbType.VarChar).Value = AppPath;
                                    cmd.Parameters.Add("@Dbname", SqlDbType.VarChar).Value = dbname;

                                    con1.Open();
                                    cmd.ExecuteNonQuery();

                                }
                                catch (Exception e)
                                {

                                }
                                finally
                                {
                                    con1.Close();
                                }
                            }

                        }
                   

                }
                reserved = true;
            }
            catch (Exception ex)
            {
                // txscope.Dispose();
            }
            return reserved;
        }


        public string UpdateBackUpDetDataLogin()
        {

            string reserved = "";
            string dbname = "";
            string AppPath = "";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {

                    dbname = con.Database;
                    DateTime dt = DateTime.Now;
                    string strDate = dt.ToString("MM/dd/yyyy");

                    string MM = dt.ToString("MM");
                    string DD = dt.ToString("dd");
                    string YY = dt.ToString("yyyy");

                    string chkfile = dbname + "_" + YY + MM + DD;

                    string dbbackname = dbname + strDate + ".bak";

                    var OQuery = entities.MisPath.FirstOrDefault();
                    if (OQuery != null)
                    {
                        AppPath = OQuery.ApplicationPath;
                    }


                    DirectoryInfo di = new DirectoryInfo(AppPath);
                    FileInfo[] smFiles = di.GetFiles("*.BAK");
                    StringBuilder builder = new StringBuilder();

                    var list1 = new List<string>();

                    foreach (FileInfo fi in smFiles)
                    {
                        string name = Path.GetFileNameWithoutExtension(fi.Name);
                            var parts = name.Split('_');
                            list1.Add(parts[0] + "_" + parts[1]);
                    }

                    bool chkExists = false;
                    foreach (string fi in list1)
                    {
                        if (fi == chkfile) {
                            chkExists = true;
                        }
                    }

                    if (chkExists)
                    {
                        reserved = "DB already Bakup";
                    }
                    else
                    {
                        using (SqlConnection con1 = new SqlConnection(connStr))
                        {

                            dbname = con1.Database;

                            using (SqlCommand cmd = new SqlCommand("proc_Apparel_AutoDbBackup", con1))
                            {
                                try
                                {
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.Add("@FilePath", SqlDbType.VarChar).Value = AppPath;
                                    cmd.Parameters.Add("@Dbname", SqlDbType.VarChar).Value = dbname;

                                    con1.Open();
                                    cmd.ExecuteNonQuery();
                                    reserved = "DB Backup Successfully";
                                }
                                catch (Exception e)
                                {
                                    reserved ="Invalid path,Please Check DB backup path and server folder..";
                                }
                                finally
                                {
                                    con1.Close();
                                }
                            }

                        }
                        
                    }

                }
               
            }
            catch (IOException ex)
            {
                // txscope.Dispose();

                reserved = ex.Message;
            }
            return reserved;
        }
    }
}
