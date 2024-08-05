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
    public class StoreUnitRepository : IStoreUnitRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<StoreUnit> GetDataListAll()
        {
            //return entities.StoreUnits.OrderBy(c => c.StoreName);


            List<StoreUnit> lstemployee = new List<StoreUnit>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterStoreUnitLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    StoreUnit employee = new StoreUnit();
                    employee.StoreUnitID = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["StoreName"].ToString();
                    employee.StoreType = rdr["StoreType"].ToString();
                    employee.ParentUnitType = rdr["ParentUnitType"].ToString();
                    employee.ParentUnitID = Convert.ToInt32(rdr["ParentUnitID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public StoreUnit GetDataById(int id)
        {
            //return entities.StoreUnits.Where(c => c.StoreUnitID == id).FirstOrDefault();
            StoreUnit employee = new StoreUnit();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from StoreUnit where StoreUnitID= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.StoreUnitID = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["StoreName"].ToString();
                    employee.StoreType = rdr["StoreType"].ToString();
                    employee.ParentUnitType = rdr["ParentUnitType"].ToString();
                    employee.ParentUnitID = Convert.ToInt32(rdr["ParentUnitID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(StoreUnit obj)
        {

            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.StoreUnit.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreUnit-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(StoreUnit obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.StoreUnit.Where(c => c.StoreUnitID == obj.StoreUnitID).FirstOrDefault();
                    if (s != null)
                    {
                        s.StoreName = obj.StoreName;
                        s.IsActive = obj.IsActive;
                        s.ParentUnitID = obj.ParentUnitID;
                        s.ParentUnitType = obj.ParentUnitType;
                        s.StoreType = obj.StoreType;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreUnit-UpdateData");
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
                    var s = entities.StoreUnit.Where(c => c.StoreUnitID == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.StoreUnit.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreUnit-DeleteData");
                }

            }
            return reserved;

        }


        public IList<Domain.StoreUnit> GetRepStoreUnitCheckItemDetails(int StoreId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetStoreUnitMasterCheck(StoreId)
                         select new Domain.StoreUnit
                         {
                             StoreName = YD1.StoreName,
                             CountStoreId = YD1.ChkStoreid,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<StoreUnit> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
