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
    public class UnitConversionRepository : IUnitConversionRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Unit_Conversion> GetDataListAll()
        {
            //return entities.Unit_Conversion.OrderBy(c => c.Conversion);
            List<Unit_Conversion> lstemployee = new List<Unit_Conversion>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterUnitConvLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Unit_Conversion employee = new Unit_Conversion();

                    employee.UConvID = Convert.ToInt32(rdr["UConvID"]);
                    employee.ConvMode = rdr["ConvMode"].ToString();
                    employee.FromUomID = Convert.ToInt32(rdr["FromUomID"]);
                    employee.ToUomID = Convert.ToInt32(rdr["ToUomID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.Conversion = rdr["UnitConversion"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Unit_Conversion GetDataById(int id)
        {
            //return entities.Unit_Conversion.Where(c => c.UConvID == id).FirstOrDefault();
            Unit_Conversion employee = new Unit_Conversion();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Unit_Conversion where UConvID= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.UConvID = Convert.ToInt32(rdr["UConvID"]);
                    employee.ConvMode = rdr["ConvMode"].ToString();
                    employee.FromUomID = Convert.ToInt32(rdr["FromUomID"]);
                    employee.ToUomID = Convert.ToInt32(rdr["ToUomID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.Conversion = rdr["Conversion"].ToString();
                }
            }
            return employee; 
        }

        public int AddData(Unit_Conversion obj)
        {


            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Unit_Conversion.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "UnitConversion-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Unit_Conversion obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Unit_Conversion.Where(c => c.UConvID == obj.UConvID).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Conversion = obj.Conversion;
                        cou.UConvID = obj.UConvID;
                        cou.FromUomID = obj.FromUomID;
                        cou.ToUomID = obj.ToUomID;
                        //cou.ToUom = obj.ToUom;
                        //cou.FromUom = obj.FromUom;
                        cou.ConvMode = obj.ConvMode;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }

                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "UnitConversion-UpdateData");
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
                    var cou = entities.Unit_Conversion.Where(c => c.UConvID == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Unit_Conversion.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "UnitConversion-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Unit_Conversion> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
