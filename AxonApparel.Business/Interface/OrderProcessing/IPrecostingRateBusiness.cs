using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPrecostingRateBusiness
    {
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsAddDetails(int Id);
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsEditDetails(int Id);

        Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricAddDetails(int Id);
        Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricEditDetails(int Id);

        Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentAddDetails(int Id);
        Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentEditDetails(int Id);

        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnAddDetails(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnEditDetails(int Id);

        Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessAddDetails(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessEditDetails(int Id);
          
        Response<bool> CreateEntry(PrecostingFabTrim_mas MEntry);
        //Response<bool> UpdateEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> DeleteEntry(PrecostingFabTrim_mas MEntry);
    }
}
