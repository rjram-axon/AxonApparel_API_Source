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
    public class TermsRepository:ITermsRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<TermMas> GetDataListAll()
        {
            //return entities.TermMas.OrderBy(c => c.TermName);
            List<TermMas> lstemployee = new List<TermMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterTermsLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    TermMas employee = new TermMas();

                    employee.TermId = Convert.ToInt32(rdr["TermId"]);
                    employee.TermName = rdr["TermName"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public TermMas GetDataById(int id)
        {
            //return entities.TermMas.Where(c => c.TermId == id).FirstOrDefault();
            TermMas employee = new TermMas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from TermMas where TermId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.TermId = Convert.ToInt32(rdr["TermId"]);
                    employee.TermName = rdr["TermName"].ToString();
                }
            }
            return employee; 
        }

        public int AddData(TermMas obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.TermMas.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TermMas-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(TermMas obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.TermMas.Where(c => c.TermId == obj.TermId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.TermName = obj.TermName;                       
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Country-UpdateData");
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
                    var cou = entities.TermMas.Where(c => c.TermId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.TermMas.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Country-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<TermMas> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
