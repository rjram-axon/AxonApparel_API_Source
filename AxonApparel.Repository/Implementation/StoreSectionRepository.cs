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

namespace AxonApparel.Repository
{
    public class StoreSectionRepository : IStoreSectionRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<StoreSection> GetDataListAll()
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<StoreSection> lstemployee = new List<StoreSection>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterStoreSectionLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    StoreSection employee = new StoreSection();
                    employee.SectionId = Convert.ToInt32(rdr["SectionId"]);
                    employee.SectionName = rdr["SectionName"].ToString();
                    employee.StoreunitId = Convert.ToInt32(rdr["StoreunitId"]);
                    employee.Status = Convert.ToBoolean(rdr["Status"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public StoreSection GetDataById(int id)
        {
            //return entities.StoreSections.Where(s => s.SectionId == id).FirstOrDefault();
            StoreSection employee = new StoreSection();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from StoreSection where SectionId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.SectionId = Convert.ToInt32(rdr["SectionId"]);
                    employee.SectionName = rdr["SectionName"].ToString();
                    employee.StoreunitId = Convert.ToInt32(rdr["StoreunitId"]);
                    employee.Status = Convert.ToBoolean(rdr["Status"]);
                }
            }
            return employee; 
        }

        public int AddData(StoreSection obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.StoreSection.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreSection-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(StoreSection obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var a = entities.StoreSection.Where(s => s.SectionId == obj.SectionId).FirstOrDefault();
                    if (a != null)
                    {
                        a.SectionName = obj.SectionName;
                        a.StoreunitId = obj.StoreunitId;
                        a.Status = obj.Status;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreSection-UpdateData");
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
                    var s = entities.StoreSection.Where(c => c.SectionId == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.StoreSection.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StoreSection-DeleteData");
                }

            }
            return reserved;
        }
        public List<SelectListItem> GetStoreName()
        {
            var vStoreName = (from tblStoreSection in entities.Country
                              select new SelectListItem
                              {
                                  Text = tblStoreSection.country1,
                                  Value = Convert.ToString(tblStoreSection.countryid)
                              });
            return vStoreName.ToList();
        }
                
        

        public IQueryable<StoreSection> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
