using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class SeasonRepository : ISeasonRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Season> GetDataListAll()
        {
            //return entities.Seasons.OrderBy(c => c.Season1);

            List<Season> lstemployee = new List<Season>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterseasonLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Season employee = new Season();
                    employee.SeasonId = Convert.ToInt32(rdr["SeasonId"]);
                    employee.Season1 = rdr["Season"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Season GetDataById(int id)
        {
            //return entities.Seasons.Where(c => c.SeasonId == id).FirstOrDefault();

            Season employee = new Season();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Season where SeasonId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.SeasonId = Convert.ToInt32(rdr["SeasonId"]);
                    employee.Season1 = rdr["Season"].ToString();            
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(Season objSea)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Season.Add(objSea);


                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Season-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Season objSea)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var Season = entities.Season.Where(c => c.SeasonId == objSea.SeasonId).FirstOrDefault();
                    if (Season != null)
                    {
                        Season.IsActive = objSea.IsActive;
                        Season.Season1 = objSea.Season1;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Season-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Season = entities.Season.Where(c => c.SeasonId == id).FirstOrDefault();
                    if (Season != null)
                    {
                        entities.Season.Remove(Season);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Season-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Season> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
