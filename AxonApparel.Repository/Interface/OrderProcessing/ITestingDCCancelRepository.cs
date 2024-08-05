using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITestingDCCancelRepository
    {
        IQueryable<TestingDCMas> GetDataList();
        bool UpdateData(TestingDCMas objupd);
        bool CheckReceiptData(int id);
    }
}
