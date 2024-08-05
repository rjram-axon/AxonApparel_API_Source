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
    public class Unit_of_measurementRepository : IUnit_of_measurementRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Unit_of_measurement> GetDataListAll()
        {
            //return entities.Unit_of_measurement.OrderBy(c => c.Uom);

            List<Unit_of_measurement> lstemployee = new List<Unit_of_measurement>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterUnitofmeasurementLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Unit_of_measurement employee = new Unit_of_measurement();
                    employee.UomId = Convert.ToInt32(rdr["UomId"]);
                    employee.Uom = rdr["Uom"].ToString();
                    employee.Abbreviation = rdr["Abbreviation"].ToString();
                    employee.IsDecimal = rdr["IsDecimal"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Unit_of_measurement GetDataById(int id)
        {
           // return entities.Unit_of_measurement.Where(c => c.UomId == id).FirstOrDefault();
            Unit_of_measurement employee = new Unit_of_measurement();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Unit_of_measurement where UomId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.UomId = Convert.ToInt32(rdr["UomId"]);
                    employee.Uom = rdr["Uom"].ToString();
                    employee.Abbreviation = rdr["Abbreviation"].ToString();
                    employee.IsDecimal = rdr["IsDecimal"].ToString();       
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(Unit_of_measurement obj)
        {

            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Unit_of_measurement.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Uom-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Unit_of_measurement obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Unit_of_measurement.Where(c => c.UomId == obj.UomId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Abbreviation = obj.Abbreviation;
                        cou.Uom = obj.Uom;
                        cou.UomId = obj.UomId;
                        cou.IsDecimal = obj.IsDecimal;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }

                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Uom-UpdateData");
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
                    var cou = entities.Unit_of_measurement.Where(c => c.UomId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Unit_of_measurement.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Uom-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.Unit_of_measurement> GetRepUomCheckItemDetails(int UomId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetUomMasterCheck(UomId)
                         select new Domain.Unit_of_measurement
                         {
                             CountUomId = YD1.ChkuomId,
                             Uom = YD1.Uom,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Unit_of_measurement> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
