using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ITestingTypeBusiness
    {
        Response<IQueryable<AxonApparel.Domain.TestingType>> GetTestingType();
        Response<int> CreateTestingType(AxonApparel.Domain.TestingType TestingTypeAdd);
        Response<bool> UpdateTestingType(AxonApparel.Domain.TestingType TestingTypeUpd);
        Response<bool> DeleteTestingType(int TestingTypeId);
        Response<AxonApparel.Domain.TestingType> GetTestingTypeId(int TestingTypeId);
    }
}
