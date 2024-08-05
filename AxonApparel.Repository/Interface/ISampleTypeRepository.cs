using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ISampleTypeRepository 
    {
        IQueryable<SampleTypeMaster> GetDataList();
        int AddData(SampleTypeMaster obj);
        bool UpdateData(SampleTypeMaster obj);
        bool DeleteData(int id);
        SampleTypeMaster GetDataById(int id);
    }
}
