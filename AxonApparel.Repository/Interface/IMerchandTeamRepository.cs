using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IMerchandTeamRepository
    {
        IQueryable<Domain.MerchandTeamMas> GetDataMainList();
        bool AddData(MerchTeamMas objAdd);
        bool UpdateData(MerchTeamMas objUpd);
        bool DeleteData(int id);
        MerchTeamMas GetMerchTeamHeaderInfo(int Teamid);
    }
}
