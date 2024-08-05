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
    public class StateRepository : IStateRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<State> GetDataList()
        {
            return entities.State.OrderBy(c => c.State1);
        }

        public State GetDataById(int id)
        {
            //return entities.States.Where(c => c.StateId == id).FirstOrDefault();
            State employee = new State();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from State where StateId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    employee.State1 = rdr["State"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Lookup = rdr["Lookup"].ToString();
                }
            }
            return employee; 
        }

        public int AddData(State obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.State.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "State-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(State obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.State.Where(c => c.StateId == obj.StateId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.IsActive = obj.IsActive;
                        Upd.StateId = obj.StateId;
                        Upd.State1 = obj.State1;
                        Upd.Lookup = obj.Lookup;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "State-UpdateData");
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
                    var Del = entities.State.Where(c => c.StateId == id).FirstOrDefault();
                    if (Del != null)
                    {
                        entities.State.Remove(Del);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "State-DeleteData");
                }

            }
            return reserved;
        }

        public IEnumerable<State> GetDataAllStateList()
        {
            List<State> lstemployee = new List<State>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterStateLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    State employee = new State();
                    employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    employee.State1 = rdr["State"].ToString();
                    employee.Lookup = rdr["Lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
    }
}
