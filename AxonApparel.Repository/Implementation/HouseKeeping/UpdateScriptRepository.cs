using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Data.OleDb;
using System.IO;
using System.Web;

namespace AxonApparel.Repository
{
    public class UpdateScriptRepository : IUpdateScriptRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        //string connStr2 = new OleDbConnection("Provider = Microsoft.Jet.OLEDB.4.0;Data Source = D:\\Nandha\\ApparelMVC03112021\\AxonApparelold27102021\\Update-DB_Scripts\\Script.mdb").ConnectionString;
        string UpdateFlg = "N";

        public IEnumerable<Domain.UpdateScript> Update(DateTime Lastdate, DateTime entrydate)
        {
            try
            {
                string ChkLicence = LicencePeriod();
                if (ChkLicence == "Ok")
                {

                    string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    string path = appPath + "/Update-DB_Scripts/" + "/Script.mdb";

                    string fullpath = path.Replace("/", "\\");
                    string connStr2 = new OleDbConnection("Provider = Microsoft.Jet.OLEDB.4.0;Data Source =" + fullpath).ConnectionString;

                    List<Domain.UpdateScript> List = new List<Domain.UpdateScript>();

                    string sComm = "SELECT * FROM [ScriptGeneral] WHERE ([ScriptDate] BETWEEN ? AND ? ) ORDER BY [Templatename] ASC;";
                    DataTable dt = new DataTable();
                    using (OleDbConnection oConn = new OleDbConnection(connStr2))
                    {
                        oConn.Open();
                        using (OleDbCommand oComm = new OleDbCommand(sComm, oConn))
                        { //first part of Where condition
                            oComm.Parameters.Add(new OleDbParameter() { Value = Lastdate, OleDbType = OleDbType.DBTimeStamp });
                            oComm.Parameters.Add(new OleDbParameter() { Value = entrydate, OleDbType = OleDbType.DBTimeStamp });

                            using (OleDbDataReader oRdr = oComm.ExecuteReader())
                            {
                                dt.Load(oRdr);
                            }
                        }
                    }


                    foreach (DataRow objDataRow in dt.Rows)
                    {
                        List.Add(new Domain.UpdateScript()
                        {
                            Scripts = objDataRow["Scripts"].ToString(),
                            ScriptDate = Convert.ToDateTime(objDataRow["ScriptDate"]),
                            ScriptId = Convert.ToInt32(objDataRow["ScriptId"]),
                            TempId = Convert.ToInt32(objDataRow["TempId"]),
                            TemplateName = objDataRow["TemplateName"].ToString(),
                            sType = objDataRow["sType"].ToString(),
                        });
                    }


                    foreach (var li in List)
                    {

                        var res = UpdateDB(li);

                    }

                    foreach (var li in List)
                    {
                        if (li.result == "Success" && UpdateFlg == "N")
                        {
                            UpdateFlg = Updatedate(Lastdate, entrydate);
                            break;
                        }
                    }
                    return List;
                }
                else {
                    List<Domain.UpdateScript> List = new List<Domain.UpdateScript>();

                    List.Add(new Domain.UpdateScript()
                    {
                        result = "LicenceExpired",
                        message = "Licence Period Expired..",
                    });

                    return List;
                }
            }
            catch (Exception ex)
            {

                List<Domain.UpdateScript> List = new List<Domain.UpdateScript>();
                return List;
            }
        }

        public Domain.UpdateScript UpdateDB(Domain.UpdateScript Det)
        {
            SqlConnection con = new SqlConnection(connStr);

               string correctString = Det.Scripts.Replace("$", "'");
               string query = correctString;

                SqlCommand cmd = new SqlCommand(query, con);
                try
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Det.result = "Success";
                    Det.message = "";
                 
                    return Det;
                }
                catch (SqlException e)
                {
                    Det.result = "Failure";
                    Det.message = e.Message;
                    return Det;
                }
                finally
                {
                    con.Close();
                }

        }


        private string Updatedate(DateTime startdate,DateTime date) {

            try
            {
                var resdate = entities.MisPath.Where(c => c.MispathId == c.MispathId).FirstOrDefault();

                resdate.ScriptUpdatedOn = date;
                entities.SaveChanges();
                return "Y";
            }
            catch (Exception e) {
                return "N";
            
            }
        
        }


        private string LicencePeriod()
        {

            try
            {
                var resdate = entities.MisPath.Where(c => c.MispathId == c.MispathId).FirstOrDefault();

                DateTime Licencedate = Convert.ToDateTime(Help.Decrypt(resdate.LicenceExpiryDate));
                if (Licencedate < DateTime.Now)
                {
                    return "Expired";
                }
                else {
                    return "Ok";
                }
            }
            catch (Exception e)
            {
                return "Expired";

            }

        }


    }
}
