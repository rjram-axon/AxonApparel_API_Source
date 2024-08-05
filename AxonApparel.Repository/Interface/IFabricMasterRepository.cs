using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IFabricMasterRepository
    {
        bool AddDetData(FabricMaster FabricMas, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess);
        bool UpdateDetData(FabricMaster FabricMas, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess);
        bool DeleteDetData(FabricMaster FabricMas, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess);
        IQueryable<Domain.FabricMaster> GetFabricmasDetails(int Id);
        IQueryable<Domain.FabricMaster> GetFabricEditDetails(int Id);
        IQueryable<Domain.FabricYarn> GetFabricyarnEditDetails(int Id);
        IQueryable<Domain.FabricProcess> GetFabricprocessEditDetails(int Id);
        IQueryable<Domain.FabricMaster> GetFabricMainDetails();
        IQueryable<Domain.FabricMaster> GetFabricdetfromyarn(int itemid, int colorid, int sizeid);
    }
}
