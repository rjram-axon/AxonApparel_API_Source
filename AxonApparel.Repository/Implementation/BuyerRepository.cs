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
    public class BuyerRepository : IBuyerRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Buyer> GetDataListAll()
        {
            //return entities.Buyer.OrderBy(c => c.Buyer1);

            List<Domain.Buyer> lstemployee = new List<Domain.Buyer>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                            

                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterBuyerLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Buyer employee = new Domain.Buyer();
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.BuyerName = rdr["Buyer"].ToString();
                    employee.LookUp = rdr["Buyer_lookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.CountryName = rdr["Country"].ToString();
                    employee.CityName = rdr["City"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.ContPerson = rdr["Contact_person"].ToString();
                    employee.Designation = rdr["Designation"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.Email = rdr["E_mail"].ToString();
                    employee.Commission = Convert.ToDecimal(rdr["Commission"]);
                    employee.BankInt = Convert.ToDecimal(rdr["BankInterest"]);
                    employee.AdminExp = Convert.ToDecimal(rdr["AdminExp"]);
                    employee.MarkPrice = Convert.ToDecimal(rdr["MarkExp"]);
                    employee.CompMargin = Convert.ToDecimal(rdr["CompMargin"]);
                    employee.DisMargin = Convert.ToDecimal(rdr["DisMargin"]);
                    employee.DealerMargin = Convert.ToDecimal(rdr["DealMargin"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Buyer GetDataById(int id)
        {
            //return entities.Buyer.Where(c => c.BuyerId == id).FirstOrDefault();
            Buyer employee = new Buyer();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Buyer where BuyerId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer1 = rdr["Buyer"].ToString();
                    employee.Buyer_lookup = rdr["Buyer_lookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.Contact_person = rdr["Contact_person"].ToString();
                    employee.Designation = rdr["Designation"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.E_mail = rdr["E_mail"].ToString();
                    employee.Commission = Convert.ToDecimal(rdr["Commission"]);
                    employee.BankInterest = Convert.ToDecimal(rdr["BankInterest"]);
                    employee.AdminExp = Convert.ToDecimal(rdr["AdminExp"]);
                    employee.MarkExp = Convert.ToDecimal(rdr["MarkExp"]);
                    employee.CompMargin = Convert.ToDecimal(rdr["CompMargin"]);
                    employee.DisMargin = Convert.ToDecimal(rdr["DisMargin"]);
                    employee.DealMargin = Convert.ToDecimal(rdr["DealMargin"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);

                    if (rdr["Currency"] != DBNull.Value)
                    {
                        employee.Currency = Convert.ToInt32(rdr["Currency"]);
                    }
                    else
                    {
                        employee.Currency = 0;
                    }
                    if (rdr["System"] != DBNull.Value)
                    {
                        employee.System = Convert.ToInt32(rdr["System"]);
                    }
                    else
                    {
                        employee.System = 0;
                    }
                    if (rdr["Shipment"] != DBNull.Value)
                    {
                        employee.Shipment = Convert.ToInt32(rdr["Shipment"]);
                    }
                    else
                    {
                        employee.Shipment = 0;
                    }
                    if (rdr["Paymode"] != DBNull.Value)
                    {
                        employee.Paymode = Convert.ToInt32(rdr["Paymode"]);
                    }
                    else
                    {
                        employee.Paymode = 0;
                    }
                    if (rdr["Manager"] != DBNull.Value)
                    {
                        employee.Manager = Convert.ToInt32(rdr["Manager"]);
                    }
                    else
                    {
                        employee.Manager = 0;
                    }
                    if (rdr["Merch"] != DBNull.Value)
                    {
                        employee.Merch = Convert.ToInt32(rdr["Merch"]);
                    }
                    else
                    {
                        employee.Merch = 0;
                    }
                    if (rdr["PortLoad"] != DBNull.Value)
                    {
                        employee.PortLoad = Convert.ToInt32(rdr["PortLoad"]);
                    }
                    else
                    {
                        employee.PortLoad = 0;
                    }
                    if (rdr["PortDestination"] != DBNull.Value)
                    {
                        employee.PortDestination = Convert.ToInt32(rdr["PortDestination"]);
                    }
                    else
                    {
                        employee.PortDestination = 0;
                    }
                    if (rdr["Allowence"] != DBNull.Value)
                    {
                        employee.Allowence = Convert.ToInt32(rdr["Allowence"]);
                    }
                    else
                    {
                        employee.Allowence = 0;
                    }
                    //employee.Currency = Convert.ToInt32(rdr["Currency"] == null ? 0 : rdr["Currency"]);
                    //employee.System = Convert.ToInt32(rdr["System"] == null ? 0 : rdr["System"]);
                    //employee.Shipment = Convert.ToInt32(rdr["Shipment"] == null ? 0 : rdr["Shipment"]);
                    //employee.Paymode = Convert.ToInt32(rdr["Paymode"] == null ? 0 : rdr["Paymode"]);
                    //employee.Manager = Convert.ToInt32(rdr["Manager"] == null ? 0 : rdr["Manager"]);
                    //employee.Merch = Convert.ToInt32(rdr["Merch"] == null ? 0 : rdr["Merch"]);
                    //employee.PortLoad = Convert.ToInt32(rdr["PortLoad"] == null ? 0 : rdr["PortLoad"]);
                    //employee.PortDestination = Convert.ToInt32(rdr["PortDestination"] == null ? 0 : rdr["PortDestination"]);
                    //employee.Allowence = Convert.ToDecimal(rdr["Allowence"] == null ? 0 : rdr["Allowence"]);
                }
            }
            return employee;
        }

        public int AddData(Buyer obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Buyer.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Buyer-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Buyer obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Buyer.Where(c => c.BuyerId == obj.BuyerId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Buyer1 = obj.Buyer1;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.Zipcode = obj.Zipcode;
                        cou.Phone = obj.Phone;
                        cou.Designation = obj.Designation;
                        cou.Buyer_lookup = obj.Buyer_lookup;
                        cou.E_mail = obj.E_mail;
                        cou.Contact_person = obj.Contact_person;
                        cou.CountryId = obj.CountryId;
                        cou.Commission = obj.Commission;
                        cou.BankInterest = obj.BankInterest;
                        cou.AdminExp = obj.AdminExp;
                        cou.MarkExp = obj.MarkExp;
                        cou.CompMargin = obj.CompMargin;
                        cou.DisMargin = obj.DisMargin;
                        cou.DealMargin = obj.DealMargin;
                        cou.Currency = obj.Currency;
                        cou.System = obj.System;
                        cou.Shipment = obj.Shipment;
                        cou.Paymode = obj.Paymode;
                        cou.Manager = obj.Manager;
                        cou.Merch = obj.Merch;
                        cou.PortLoad = obj.PortLoad;
                        cou.PortDestination = obj.PortDestination;
                        cou.Allowence = obj.Allowence;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Buyer-UpdateData");
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
                    var cou = entities.Buyer.Where(c => c.BuyerId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Buyer.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Buyer-DeleteData");
                }

            }
            return reserved;

        }

        public IList<Domain.Buyer> GetRepBuyerCheckItemDetails(int BuyerId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetBuyerMasterCheck(BuyerId)
                         select new Domain.Buyer
                         {
                             CountBuyerId = YD1.ChkBuyerId,
                             BuyerName = YD1.Buyer,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Buyer> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
