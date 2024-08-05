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
    public class ItemGroupRepository : IItemGroupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<ItemGroup> GetDataListAll()
        {
           // return entities.ItemGroups.OrderBy(c => c.ItemGroup1);
            List<ItemGroup> lstemployee = new List<ItemGroup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterItemGroupLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ItemGroup employee = new ItemGroup();
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.ItemGroup1 = rdr["ItemGroup"].ToString();
                    employee.Category1 = rdr["Category1"].ToString();
                    employee.Category2 = rdr["Category2"].ToString();
                    employee.Category3 = rdr["Category3"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);  
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public ItemGroup GetDataById(int id)
        {
           // return entities.ItemGroups.Where(c => c.Id == id).FirstOrDefault();
            ItemGroup employee = new ItemGroup();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from ItemGroup where Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.ItemGroup1 = rdr["ItemGroup"].ToString();
                    employee.Category1 = rdr["Category1"].ToString();
                    employee.Category2 = rdr["Category2"].ToString();
                    employee.Category3 = rdr["Category3"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);  
                }
            }
            return employee;
        }

        public int AddData(ItemGroup obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.ItemGroup.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ItemGroup-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(ItemGroup obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.ItemGroup.Where(c => c.Id == obj.Id).FirstOrDefault();
                    if (s != null)
                    {
                        s.ItemGroup1 = obj.ItemGroup1;
                        s.Category1 = obj.Category1;
                        s.Category2 = obj.Category2;
                        s.Category3 = obj.Category3;
                        s.IsActive = obj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ItemGroup-UpdateData");
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
                    var s = entities.ItemGroup.Where(c => c.Id == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.ItemGroup.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ItemGroup-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.ItemGroup> GetRepItemGroupCheckItemDetails(int ItemGroupId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetItemgroupMasterCheck(ItemGroupId)
                         select new Domain.ItemGroup
                         {
                             CountItemGroupId = YD1.ChkItemgroupId,
                             ItemGroupName = YD1.ItemGroup,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<ItemGroup> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
