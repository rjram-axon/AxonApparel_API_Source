using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CourierRepository : ICourierRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Courier> GetDataList()
        {
            return entities.Courier.OrderBy(c => c.Courier1);
        }

        public Courier GetDataById(int id)
        {
            return entities.Courier.Where(c => c.CourierId == id).FirstOrDefault();
        }

        public int AddData(Courier obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Courier.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Courier-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Courier obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Courier.Where(c => c.CourierId == obj.CourierId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.Courier1 = obj.Courier1;
                        cou.CourierAddress = obj.CourierAddress;
                        cou.URL = obj.URL;
                        cou.Phone = obj.Phone;
                        cou.Email = obj.Email;
                        cou.Fax = obj.Fax;
                        cou.CountryId = obj.CountryId;
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
                    exceplogg.SendExcepToDB(ex, "Courier-UpdateData");
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
                    var cou = entities.Courier.Where(c => c.CourierId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Courier.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Courier-DeleteData");
                }

            }
            return reserved;
        }
    }
}
