using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITestingDCReceiptRepository
    {
        IQueryable<TestingDCReceiptMas> GetDataList();
        bool AddData(TestingDCReceiptMas objAd, List<TestingDCReceiptDet> objPDet);
        bool UpdateData(TestingDCReceiptMas objupd, List<TestingDCReceiptDet> objPDet);
        bool DeleteData(int id);
        TestingDCReceiptMas GetDataById(int id);
    }
}
