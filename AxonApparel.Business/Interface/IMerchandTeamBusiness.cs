using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IMerchandTeamBusiness
    {
        Response<IQueryable<Domain.MerchandTeamMas>> GetMerchandTemplate();
        Response<int> CreateMerchandiserTeam(Domain.MerchandTeamMas MercTeamMas);
        Response<bool> UpdateMerchandTeam(Domain.MerchandTeamMas MerTeamUpd);
        Response<bool> Delete(int MercId);
        Response<Domain.MerchandTeamMas> GetDataById(int TeamId);
    }
}
