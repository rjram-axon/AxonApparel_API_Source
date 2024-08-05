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
    public class ShipmentSystemRepository : IShipmentSystemRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<ShipmentSystem> GetDataListAll()
        {
            //return entities.ShipmentSystems.OrderBy(c => c.System);

            List<ShipmentSystem> lstemployee = new List<ShipmentSystem>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterShipmentSystemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ShipmentSystem employee = new ShipmentSystem();
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.System = rdr["System"].ToString();
                    employee.FreeorCharge = rdr["FreeorCharge"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public ShipmentSystem GetDataById(int SystemId)
        {
            //return entities.ShipmentSystems.Where(c => c.SystemId == SystemId).FirstOrDefault();

            ShipmentSystem employee = new ShipmentSystem();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from ShipmentSystem where SystemId= " + SystemId;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.System = rdr["System"].ToString();
                    employee.FreeorCharge = rdr["FreeorCharge"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(ShipmentSystem objShipmentSystem)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.ShipmentSystem.Add(objShipmentSystem);


                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ShipmentSystem-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(ShipmentSystem objShipmentSystem)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var ShipSys = entities.ShipmentSystem.Where(c => c.SystemId == objShipmentSystem.SystemId).FirstOrDefault();
                    if (ShipSys != null)
                    {
                        ShipSys.IsActive = objShipmentSystem.IsActive;
                        ShipSys.System = objShipmentSystem.System;
                        ShipSys.FreeorCharge = objShipmentSystem.FreeorCharge;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ShipmentSystem-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int SystemId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var ShipSys = entities.ShipmentSystem.Where(c => c.SystemId == SystemId).FirstOrDefault();
                    if (ShipSys != null)
                    {
                        entities.ShipmentSystem.Remove(ShipSys);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ShipmentSystem-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.ShipmentSystem> GetRepSysCheckItemDetails(int systemid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetShipMasterCheck(systemid)
                         select new Domain.ShipmentSystem
                         {
                             CountSystemId = YD1.ChkSystId,
                             System = YD1.System,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<ShipmentSystem> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
