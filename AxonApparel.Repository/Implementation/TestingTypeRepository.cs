using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TestingTypeRepository : ITestingTypeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<TestingType> GetDataList()
        {
            return entities.TestingType.OrderBy(c => c.TestingType1);
        }

        public int AddData(TestingType obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.TestingType.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Testing Type Master-AddData");
                }
            }
            return reserved;
        }

        public bool UpdateData(TestingType obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.TestingType.Where(c => c.TestingTypeId == obj.TestingTypeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.TestingType1 = obj.TestingType1;
                        cou.TestingTypeId = obj.TestingTypeId;
                        cou.GarFab = obj.GarFab;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TestingTypeMaster-UpdateData");
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
                    var cou = entities.TestingType.Where(c => c.TestingTypeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.TestingType.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TestingTypeMaster-Delete Data");
                }
            }
            return reserved;
        }

        public TestingType GetDataById(int id)
        {
            return entities.TestingType.Where(c => c.TestingTypeId == id).FirstOrDefault();
        }

    }
}
