using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IMisSettingRepository
    {
        bool UpdateDetData(MisPath objMisEntry);
        IEnumerable<MisSetting> GetDataRepMisDetails();
        Domain.MisSetting GetMisDefalutRep(int MisId);
    }
}
