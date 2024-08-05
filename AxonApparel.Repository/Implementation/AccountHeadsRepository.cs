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
    public class AccountHeadsRepository : IAccountHeadsRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

    
        public IEnumerable<AddLess> GetDataListAll()
        {
            //return entities.AddLesses.OrderBy(c => c.Addless1);
            List<AddLess> lstemployee = new List<AddLess>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAddlessLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    AddLess employee = new AddLess();
                    employee.AddlessId = Convert.ToInt32(rdr["AddlessId"]);
                    employee.Addless1 = rdr["Addless"].ToString();
                    employee.Per = Convert.ToInt32(rdr["Per"]);
                    employee.Amount = Convert.ToInt32(rdr["Amount"]);
                    employee.Type = rdr["Type"].ToString();
                    employee.Lookup = rdr["Lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.AddlessType = rdr["AddlessType"].ToString();
                    employee.Locked = Convert.ToBoolean(rdr["Locked"]);
                    employee.GroupNameID = Convert.ToInt32(rdr["GroupNameID"]);
                    employee.ISINVOICE = Convert.ToBoolean(rdr["ISINVOICE"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public AddLess GetDataById(int id)
        {
            // return entities.AddLesses.Where(c => c.AddlessId == id).FirstOrDefault();
            AddLess employee = new AddLess();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAddlessMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@addlessid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.AddlessId = Convert.ToInt32(rdr["GroupId"]);
                    employee.Addless1 = rdr["GroupName"].ToString();
                    employee.Per = Convert.ToInt32(rdr["Per"]);
                    employee.Amount = Convert.ToInt32(rdr["Amount"]);
                    employee.Type = rdr["Type"].ToString();
                    employee.Lookup = rdr["Lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.AddlessType = rdr["AddlessType"].ToString();
                    employee.Locked = Convert.ToBoolean(rdr["Locked"]);
                    employee.GroupNameID = Convert.ToInt32(rdr["GroupNameID"]);
                    employee.ISINVOICE = Convert.ToBoolean(rdr["ISINVOICE"]);
                }
            }
            return employee;
        }

        public int AddData(AddLess objadd)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.AddLess.Add(objadd);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "AccountHeads-AddData");
                }

            }
            return reserved;
        }


        public bool UpdateData(AddLess objadl)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var addless = entities.AddLess.Where(c => c.AddlessId == objadl.AddlessId).FirstOrDefault();
                    if (addless != null)
                    {
                        addless.IsActive = objadl.IsActive;
                        addless.Addless1 = objadl.Addless1;
                        addless.AddlessType = objadl.AddlessType;
                        addless.Amount = objadl.Amount;
                        addless.Per = objadl.Per;
                        addless.Lookup = objadl.Lookup;
                        addless.AddlessId = objadl.AddlessId;
                        addless.GroupNameID = objadl.GroupNameID;
                        addless.ISINVOICE = objadl.ISINVOICE;
                        addless.Locked = objadl.Locked;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "AccountHeads-UpdateData");
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
                    var addl = entities.AddLess.Where(c => c.AddlessId == id).FirstOrDefault();
                    if (addl != null)
                    {
                        entities.AddLess.Remove(addl);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "AccountHeads-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.AccountHeads> GetRepAccountCheckItemDetails(int accountsid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetAccountsMasterCheck(accountsid)
                         select new Domain.AccountHeads
                         {
                             addless = YD1.ChkAddless,
                             Countaddlessid = YD1.ChkAddlessId,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<AddLess> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
