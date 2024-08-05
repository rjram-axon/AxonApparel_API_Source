using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
//using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TestingDCReceiptApprovalRepository:ITestingDCReceiptApprovalRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<TestingDCReceiptMas> GetDataList()
        {
            return entities.TestingDCReceiptMas.Where(w=>w.PA=="P").OrderBy(c => c.DCReceiptNo);
        }

        public bool UpdateData(int id)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.TestingDCReceiptMas.Where(c => c.TestingDCReceiptId == id).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.PA = "A";
                        Upd.ModifyDate = DateTime.Now;

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

    }
}
