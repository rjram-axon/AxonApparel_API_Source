using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IMisSettingBusines
    {
        Response<bool> UpdateMisEntry(MisSetting MisEntry);
        Response<IEnumerable<MisSetting>> GetDataMisDetails();
        Response<MisSetting> GetBusMisDetails(int MisId);
      
    }
}
