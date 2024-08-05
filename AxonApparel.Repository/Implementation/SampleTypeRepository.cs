using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class SampleTypeRepository:ISampleTypeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<SampleTypeMaster> GetDataList()
        {
            return entities.SampleTypeMaster.OrderBy(c => c.SampleType);
        }

        public int AddData(SampleTypeMaster obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.SampleTypeMaster.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Sample Type Master-AddData");
                }
            }
            return reserved;
        }

        public bool UpdateData(SampleTypeMaster obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.SampleTypeMaster.Where(c => c.SampleTypeId == obj.SampleTypeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.SampleType = obj.SampleType;
                        cou.SampleTypeId = obj.SampleTypeId;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "SampleTypeMaster-UpdateData");
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
                    var cou = entities.SampleTypeMaster.Where(c => c.SampleTypeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.SampleTypeMaster.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "SampleTypeMaster-DeleteData");
                }
            }
            return reserved;
        }

        public SampleTypeMaster GetDataById(int id)
        {
            return entities.SampleTypeMaster.Where(c => c.SampleTypeId == id).FirstOrDefault();
        }
    }
}
