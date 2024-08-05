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
    public class DescriptionRepository : IDescriptionRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Description> GetDataAllList()
        {
            List<Description> Listmain = new List<Description>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterdescriptionLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Description employee = new Description();
                    employee.DescriptionId = Convert.ToInt32(rdr["DescriptionId"]);
                    employee.Description1 = rdr["Description"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    Listmain.Add(employee);
                }
                con.Close();
            }
            return Listmain;
        }
        public int AddData(Description objRe)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Description.Add(objRe);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Description-AddData");
                }

            }
            return reserved;
        }
        public Description GetDataById(int id)
        {
            Description employee = new Description();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Description where DescriptionId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.DescriptionId = Convert.ToInt32(rdr["DescriptionId"]);
                    employee.Description1 = rdr["Description"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }
        public bool UpdateData(Description objr)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var App = entities.Description.Where(c => c.DescriptionId == objr.DescriptionId).FirstOrDefault();
                    if (App != null)
                    {
                        App.IsActive = (bool)objr.IsActive;
                        App.Description1 = objr.Description1;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Description-UpdateData");
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
                    var App = entities.Description.Where(c => c.DescriptionId == id).FirstOrDefault();
                    if (App != null)
                    {
                        entities.Description.Remove(App);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Description-DeleteData");
                }

            }
            return reserved;
        }
        public IQueryable<Description> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
