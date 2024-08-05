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
    public class CurrencyRepository : ICurrencyRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Currency> GetDataListAll()
        {
            //return entities.Currencies.OrderBy(c => c.Currency1);
            List<Currency> lstemployee = new List<Currency>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCurrencyLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Currency employee = new Currency();
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Currency1 = rdr["Currency"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Abbreviation = rdr["Abbreviation"].ToString();
                    employee.CountryID = Convert.ToInt32(rdr["CountryID"]);
                    employee.Euro = Convert.ToBoolean(rdr["Euro"]);
                    employee.Decimalplace = Convert.ToByte(rdr["Decimalplace"]);
                    employee.Exchangerate = Convert.ToDecimal(rdr["Exchangerate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Currency GetDataById(int id)
        {
            //return entities.Currencies.Where(c => c.CurrencyId == id).FirstOrDefault();
            Currency employee = new Currency();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCurrencyMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@currid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Currency1 = rdr["Currency"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Abbreviation = rdr["Abbreviation"].ToString();
                    employee.CountryID = Convert.ToInt32(rdr["CountryID"]);
                    employee.Euro = Convert.ToBoolean(rdr["Euro"]);
                    employee.Decimalplace = Convert.ToByte(rdr["Decimalplace"]);
                    employee.Exchangerate = Convert.ToDecimal(rdr["Exchangerate"]);
                }
            }
            return employee;  
        }

        public int AddData(Currency objcur)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Currency.Add(objcur);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Currency-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Currency objcur)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var curr = entities.Currency.Where(c => c.CurrencyId == objcur.CurrencyId).FirstOrDefault();
                    if (curr != null)
                    {
                        curr.IsActive = objcur.IsActive;
                        curr.Abbreviation = objcur.Abbreviation;
                        curr.Currency1 = objcur.Currency1;
                        curr.Decimalplace = objcur.Decimalplace;
                        curr.Euro = objcur.Euro;
                        curr.Exchangerate = objcur.Exchangerate;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Currency-UpdateData");
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
                    var Curr = entities.Currency.Where(c => c.CurrencyId == id).FirstOrDefault();
                    if (Curr != null)
                    {
                        entities.Currency.Remove(Curr);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Currency-DeleteData");
                }

            }
            return reserved;

        }

        public IList<Domain.Currency> GetRepCurrencyCheckItemDetails(int Currid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetCurrencyMasterCheck(Currid)
                         select new Domain.Currency
                         {
                             CountCurrencyId = YD1.ChkCurrId,
                             CurrencyName = YD1.Currency,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Currency> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
