using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public class CityRepository : ICityRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.City> GetDataListAll()
        {
            //return entities.City.OrderBy(c => c.City1);
            List<Domain.City> lstemployee = new List<Domain.City>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCityLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.City employee = new Domain.City();
                    employee.CityId = Convert.ToInt32(rdr["Id"]);
                    employee.CityName = rdr["City"].ToString();
                    employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.IsActive = (rdr["IsActive"]).ToString(); ;
                    employee.CountryName = rdr["Country"].ToString(); ;
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;

        }

        public City GetDataById(int id)
        {
            //return entities.City.Where(c => c.Id == id).FirstOrDefault();
            City employee = new City();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from City where Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.City1 = rdr["City"].ToString();
                    employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }


        public List<SelectListItem> GetCountryName()
        {
            var vCountryName = (from tblCountry in entities.Country
                                select new SelectListItem
                                {
                                    Text = tblCountry.country1,
                                    Value = Convert.ToString(tblCountry.countryid)
                                });
            return vCountryName.ToList();
        }

        public int AddData(City obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.City.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "City-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(City cityobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var citUpd = entities.City.Where(c => c.Id == cityobj.Id).FirstOrDefault();
                    if (citUpd != null)
                    {
                        citUpd.IsActive = cityobj.IsActive;
                        citUpd.City1 = cityobj.City1;
                        citUpd.CountryId = cityobj.CountryId;
                        citUpd.StateId = cityobj.StateId;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "City-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int Cityid)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var citDel = entities.City.Where(c => c.Id == Cityid).FirstOrDefault();
                    if (citDel != null)
                    {
                        entities.City.Remove(citDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "City-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.City> GetRepCityCheckItemDetails(int cityid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetCityMasterCheck(cityid)
                         select new Domain.City
                         {
                             CountcityId = YD1.ChkCityId,
                             CityName = YD1.ChkCity,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<City> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
