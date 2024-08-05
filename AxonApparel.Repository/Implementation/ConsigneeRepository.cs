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
    public class ConsigneeRepository : IConsigneeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Consignee> GetDataListAll()
        {
            //return entities.Consignees.OrderBy(c => c.Consignee1);
            List<Domain.Consignee> lstemployee = new List<Domain.Consignee>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterConsigneeLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Consignee employee = new Domain.Consignee();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.ConsigneeName = rdr["Consignee"].ToString();
                    employee.Lookup = rdr["Consignee_Lookup"].ToString();
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.CityName = rdr["City"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Consignee GetDataById(int id)
        {
            //return entities.Consignees.Where(c => c.ConsigneeId == id).FirstOrDefault();

            Consignee employee = new Consignee();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Consignee where ConsigneeId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.Consignee1 = rdr["Consignee"].ToString();
                    employee.Consignee_Lookup = rdr["Consignee_Lookup"].ToString();
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;

        }

        public int AddData(Consignee obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Consignee.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Consignee-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Consignee obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Consignee.Where(c => c.ConsigneeId == obj.ConsigneeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Consignee1 = obj.Consignee1;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.Zipcode = obj.Zipcode;
                        cou.Consignee_Lookup = obj.Consignee_Lookup;
                        cou.Remarks = obj.Remarks;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Consignee-UpdateData");
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
                    var cou = entities.Consignee.Where(c => c.ConsigneeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Consignee.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Consignee-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Consignee> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
