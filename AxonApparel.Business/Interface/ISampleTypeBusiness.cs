using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ISampleTypeBusiness
    {
        Response<IQueryable<AxonApparel.Domain.SampleTypeMas>> GetSampleType();
        Response<int> CreateSampleType(AxonApparel.Domain.SampleTypeMas SampleTypeAdd);
        Response<bool> UpdateSampleType(AxonApparel.Domain.SampleTypeMas SampleTypeUpd);
        Response<bool> DeleteSampleType(int SampleTypeId);
        Response<AxonApparel.Domain.SampleTypeMas> GetSampleTypeId(int SampleTypeId);
    }
}
