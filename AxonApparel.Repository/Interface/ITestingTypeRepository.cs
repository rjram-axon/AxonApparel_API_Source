using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITestingTypeRepository
    {
        IQueryable<TestingType> GetDataList();
        int AddData(TestingType obj);
        bool UpdateData(TestingType obj);
        bool DeleteData(int id);
        TestingType GetDataById(int id);
    }
}
