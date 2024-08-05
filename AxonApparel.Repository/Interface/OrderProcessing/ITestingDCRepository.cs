using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITestingDCRepository
    {
        IQueryable<TestingDCMas> GetDataList();
        int GetGatePassNo();
        bool AddData(TestingDCMas objAd, List<TestingDCDet> objPDet, GatePassNo gatepassobj);
        TestingDCMas GetDataById(int id);
        bool DeleteData(int id);
        bool UpdateData(TestingDCMas objupd, List<TestingDCDet> objPDet);
    }
}
