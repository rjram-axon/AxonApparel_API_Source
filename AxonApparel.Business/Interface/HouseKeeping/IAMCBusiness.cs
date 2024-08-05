using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IAMCBusiness
    {
        Response<bool> UpdateUserdata(int dcompanyid);
        Response<IEnumerable<Domain.MisSetting>> CheckUserLicence(int dcompanyid);
        Response<IEnumerable<Domain.MisSetting>> GetCompany();
        Response<IEnumerable<Domain.MisSetting>> CheckAMC();
    }
}
