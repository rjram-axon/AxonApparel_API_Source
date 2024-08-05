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
    public class LedgerRepository : ILedgerRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Ledger> GetDataListAll()
        {
            //return entities.Ledger.OrderBy(c => c.Ledger1);

            List<Ledger> lstemployee = new List<Ledger>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterLedgerLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Ledger employee = new Ledger();
                    employee.LedgerId = Convert.ToInt32(rdr["LedgerId"]);
                    employee.Ledger1 = rdr["Ledger1"].ToString();                
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    //employee.Country = "TEST";
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Ledger GetDataById(int id)
        {
            //return entities.Ledger.Where(c => c.LedgerId == id).FirstOrDefault();

            Ledger employee = new Ledger();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Ledger where LedgerId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.LedgerId = Convert.ToInt32(rdr["LedgerId"]);
                    employee.Ledger1 = rdr["Ledger"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
                con.Close();
            }
            return employee; 
        }

        public int AddData(Ledger obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Ledger.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Ledger-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Ledger obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.Ledger.Where(c => c.LedgerId == obj.LedgerId).FirstOrDefault();
                    if (s != null)
                    {
                        s.Ledger1 = obj.Ledger1;
                        s.IsActive = obj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Ledger-UpdateData");
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
                    var s = entities.Ledger.Where(c => c.LedgerId == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.Ledger.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Ledger-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Ledger> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
