using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IAMCRepository
    {
        bool UpdateUserdata(int dcompanyid);
        IEnumerable<Domain.MisSetting> CheckUserLicence(int dcompanyid);
        IEnumerable<Domain.MisSetting> GetCompany();
        IEnumerable<Domain.MisSetting> CheckAMC();
    }
}
