using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ITestingDCCancelBusiness
    {
        Response<IQueryable<AxonApparel.Domain.TestingDCMas>> GetTestingDC();
        Response<bool> Update(Domain.TestingDCMas obj);
        Response<bool> GetTestingDCReceiptDetails(int id);
    }
}
