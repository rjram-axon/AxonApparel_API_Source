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
    public class ReasonRepository : IReasonRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Reason> GetDataAllList()
        {
            //return entities.Reasons.OrderBy(c => c.Reason1);
            List<Reason> lstemployee = new List<Reason>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterReasonLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Reason employee = new Reason();
                    employee.ReasonId = Convert.ToInt32(rdr["ReasonId"]);
                    employee.Reason1 = rdr["Reason"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Reason GetDataById(int id)
        {
            // return entities.Reasons.Where(c => c.ReasonId == id).FirstOrDefault();
            Reason employee = new Reason();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Reason where ReasonId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.ReasonId = Convert.ToInt32(rdr["ReasonId"]);
                    employee.Reason1 = rdr["Reason"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Reason objRe)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Reason.Add(objRe);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Reason-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Reason objr)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var App = entities.Reason.Where(c => c.ReasonId == objr.ReasonId).FirstOrDefault();
                    if (App != null)
                    {
                        App.IsActive = objr.IsActive;
                        App.Reason1 = objr.Reason1;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Reason-UpdateData");
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
                    var App = entities.Reason.Where(c => c.ReasonId == id).FirstOrDefault();
                    if (App != null)
                    {
                        entities.Reason.Remove(App);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Reason-DeleteData");
                }

            }
            return reserved;
        }



        public IQueryable<Reason> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
