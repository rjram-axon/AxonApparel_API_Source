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
    public class OverHeadsRepository : IOverHeadsRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Commercialmas> GetDataAllList()
        {
            //return entities.Commercialmas.OrderBy(c => c.commercial);
            List<Commercialmas> lstemployee = new List<Commercialmas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCommercialmasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Commercialmas employee = new Commercialmas();

                    employee.commercialid = Convert.ToInt32(rdr["commercialid"]);
                    employee.commercial = rdr["commercial"].ToString();
                    employee.CostType = rdr["CostType"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Commercialmas GetDataById(int id)
        {
            //return entities.Commercialmas.Where(c => c.commercialid == id).FirstOrDefault();
            Commercialmas employee = new Commercialmas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Commercialmas where commercialid= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.commercialid = Convert.ToInt32(rdr["commercialid"]);
                    employee.commercial = rdr["commercial"].ToString();
                    employee.CostType = rdr["CostType"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Commercialmas obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Commercialmas.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OverHeads-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Commercialmas obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var addless = entities.Commercialmas.Where(c => c.commercialid == obj.commercialid).FirstOrDefault();
                    if (addless != null)
                    {
                        addless.IsActive = obj.IsActive;
                        addless.commercialid = obj.commercialid;
                        addless.commercial = obj.commercial;
                        addless.CostType = obj.CostType;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OverHeads-UpdateData");
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
                    var addl = entities.Commercialmas.Where(c => c.commercialid == id).FirstOrDefault();
                    if (addl != null)
                    {
                        entities.Commercialmas.Remove(addl);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OverHeads-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Commercialmas> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
