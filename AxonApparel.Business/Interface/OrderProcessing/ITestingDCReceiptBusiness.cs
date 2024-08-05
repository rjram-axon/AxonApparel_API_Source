using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ITestingDCReceiptBusiness
    {
        Response<IQueryable<AxonApparel.Domain.TestingDCReceiptMas>> GetTestingDCReceipt();
        Response<bool> CreateTestingDCReceipt(Domain.TestingDCReceiptMas tstDCobj);
        Response<bool> Update(Domain.TestingDCReceiptMas obj);
        Response<bool> Delete(int id);
        Response<AxonApparel.Domain.TestingDCReceiptMas> GetTestingDCReceiptId(int TestingDCRecptId);
    }
}
