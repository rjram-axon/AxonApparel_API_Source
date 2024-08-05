using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ITestingDCBusiness
    {
        Response<IQueryable<AxonApparel.Domain.TestingDCMas>> GetTestingDC();
        Response<int> GetGatePassNoBuss();
        Response<bool> CreateTestingDC(Domain.TestingDCMas tstDCobj);
        Response<AxonApparel.Domain.TestingDCMas> GetTestingDCId(int TestingDCId);
        Response<bool> Delete(int id);
        Response<bool> Update(Domain.TestingDCMas obj);
    }
}
