using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class PortOfLoadingRepository : IPortOfLoadingRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.PortOfLoading> GetDataListAll()
        {
            //return entities.PortofLoadings.OrderBy(c => c.PortOfLoading1);
            List<Domain.PortOfLoading> lstemployee = new List<Domain.PortOfLoading>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterPortLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PortOfLoading employee = new Domain.PortOfLoading();

                    employee.PortOfLoadingId = Convert.ToInt32(rdr["PortOfLoadingId"]);
                    employee.CountryId = Convert.ToInt32(rdr["Countryid"]);
                    employee.PortOfLoading1 = rdr["PortOfLoading"].ToString();
                    employee.PortCode = rdr["PortCode"].ToString();
                    employee.Country = rdr["country"].ToString();
                    employee.IsActive = (rdr["IsActive"]).ToString(); 
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public PortofLoading GetDataById(int PortofLoadingId)
        {
            //return entities.PortofLoadings.Where(c => c.PortOfLoadingId == PortofLoadingId).FirstOrDefault();
            PortofLoading employee = new PortofLoading();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from PortofLoading where PortOfLoadingId= " + PortofLoadingId;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.PortOfLoadingId = Convert.ToInt32(rdr["PortOfLoadingId"]);
                    employee.Countryid = Convert.ToInt32(rdr["Countryid"]);
                    employee.PortOfLoading1 = rdr["PortOfLoading"].ToString();
                    employee.PortCode = rdr["PortCode"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(PortofLoading obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.PortofLoading.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PortOfLoading-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(PortofLoading PortOfLoadingobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var PortOfLoadUpd = entities.PortofLoading.Where(c => c.PortOfLoadingId == PortOfLoadingobj.PortOfLoadingId).FirstOrDefault();
                    if (PortOfLoadUpd != null)
                    {
                        PortOfLoadUpd.PortOfLoadingId = PortOfLoadingobj.PortOfLoadingId;
                        PortOfLoadUpd.PortOfLoading1 = PortOfLoadingobj.PortOfLoading1;
                        PortOfLoadUpd.PortCode = PortOfLoadingobj.PortCode;
                        PortOfLoadUpd.Countryid = PortOfLoadingobj.Countryid;
                        PortOfLoadUpd.Country = PortOfLoadingobj.Country;
                        PortOfLoadUpd.IsActive = PortOfLoadingobj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PortOfLoading-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int PortofLoadingId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var PortofLoadDel = entities.PortofLoading.Where(c => c.PortOfLoadingId == PortofLoadingId).FirstOrDefault();
                    if (PortofLoadDel != null)
                    {
                        entities.PortofLoading.Remove(PortofLoadDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PortOfLoading-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.PortOfLoading> GetRepPortCheckItemDetails(int portid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPortOFLoadingMasterCheck(portid)
                         select new Domain.PortOfLoading
                         {
                             CountportId = YD1.ChkPortId,
                             PortOfLoading1 = YD1.PortOfLoading,

                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<PortofLoading> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
