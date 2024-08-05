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
    public class CountryRepository : ICountryRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        //public IQueryable<Country> GetDataList()
        //{
        //   // return entities.Countries.OrderBy(c => c.country1);
        //}

        public Country GetDataById(int id)
        {
            //return entities.Countries.Where(c => c.countryid == id).FirstOrDefault();
            Country employee = new Country();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from country where countryid= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.countryid = Convert.ToInt32(rdr["countryid"]);
                    employee.country1 = rdr["country"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.lookup = rdr["lookup"].ToString();
                }
            }
            return employee;  
        }

        public int AddData(Country obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Country.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Country-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Country countryobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Country.Where(c => c.countryid == countryobj.countryid).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = countryobj.IsActive;
                        cou.country1 = countryobj.country1;
                        cou.lookup = countryobj.lookup;
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

        public bool DeleteData(int countryid)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Country.Where(c => c.countryid == countryid).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Country.Remove(cou);
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

        public IList<Domain.Country> GetRepCountryCheckItemDetails(int countryid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetCountryMasterCheck(countryid)
                         select new Domain.Country
                         {
                             CountCountryId = (int)(YD1.ChkCountryId == null ? 0 : YD1.ChkCountryId),//(int)YD1.ChkCountryId,
                             CountryName = YD1.country,


                         }).AsQueryable();

            return query.ToList();
        }


        //To View all employees details    
        public IEnumerable<Country> GetAllCountry()
        {
            List<Country> lstemployee = new List<Country>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMastercountryLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Country employee = new Country();
                    employee.countryid = Convert.ToInt32(rdr["countryid"]);
                    employee.country1 = rdr["country"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);                    
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IQueryable<Country> GetDataList()
        {
            return entities.Country.OrderBy(c => c.country1);
        }
    }
}
