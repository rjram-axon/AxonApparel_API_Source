using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BankRepository : IBankRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Bank> GetDataList()
        {
            return entities.Bank.OrderBy(c => c.Bank1);
        }

        public Bank GetDataById(int id)
        {
            return entities.Bank.Where(c => c.Id == id).FirstOrDefault();

        }

        public int AddData(Bank obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Bank.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Bank obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Bank.Where(c => c.Id == obj.Id).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.Id = obj.Id;
                        cou.Bank1 = obj.Bank1;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.CountryId = obj.CountryId;
                        cou.Zipcode = obj.Zipcode;
                        cou.ShiftNo = obj.ShiftNo;
                        cou.ShortCode = obj.ShortCode;
                        cou.LookUp = obj.LookUp;
                        cou.Mob_No = obj.Mob_No;
                        cou.Fax = obj.Fax;
                        cou.Telex = obj.Telex;
                        cou.E_Mail = obj.E_Mail;
                        cou.Contact_Name = obj.Contact_Name;
                        cou.IsActive = obj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-UpdateData");
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
                    var cou = entities.Bank.Where(c => c.Id == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Bank.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-DeleteData");
                }

            }
            return reserved;
        }
    }
}
