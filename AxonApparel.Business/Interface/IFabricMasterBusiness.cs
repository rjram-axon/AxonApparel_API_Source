using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IFabricMasterBusiness
    {
        Response<bool> CreateEntry(FabricMaster MEntry);
        Response<bool> UpdateEntry(FabricMaster MEntry);
        Response<bool> DeleteEntry(FabricMaster MEntry);

        Response<IQueryable<Domain.FabricMaster>> GetFabricmasDetails(int Id);
        Response<IQueryable<Domain.FabricMaster>> GetFabricEditDetails(int Id);
        Response<IQueryable<Domain.FabricYarn>> GetFabricyarnEditDetails(int Id);
        Response<IQueryable<Domain.FabricProcess>> GetFabricprocessEditDetails(int Id);
        Response<IQueryable<Domain.FabricMaster>> GetFabricMainDetails();
        Response<IQueryable<Domain.FabricMaster>> GetFabricdetfromyarn(int itemid, int colorid, int sizeid);
    }
}
