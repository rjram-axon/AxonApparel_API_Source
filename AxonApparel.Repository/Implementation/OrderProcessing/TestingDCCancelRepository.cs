using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TestingDCCancelRepository : ITestingDCCancelRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<TestingDCMas> GetDataList()
        {
            return entities.TestingDCMas.Where(t => t.IsActive).OrderBy(c => c.DCNo);
        }

        public bool UpdateData(TestingDCMas objupd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.TestingDCMas.Where(c => c.TestingDCId == objupd.TestingDCId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.IsActive = false;
                        Upd.CancelNarr = objupd.CancelNarr;                       
                        Upd.ModifyBy = objupd.ModifyBy;
                        Upd.Modify_Date = DateTime.Now;

                        entities.SaveChanges();                        

                        txscope.Complete();
                        result = true;

                    }
                    else { result = false; }

                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    throw ex;
                }
            }
        }

        public bool CheckReceiptData(int id)
        {
            var result = false;

            //TestingDCReceiptMas
            var Upd = entities.TestingDCReceiptMas.Where(c => c.TestingDCId == id).FirstOrDefault();
            if (Upd != null)
            {
                result = true;
            }
            else
            {
                result = false;
            }
            
            return result;
        }
    }
}
