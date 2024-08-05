using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPrecostingRateRepository
    {
       IQueryable<Domain.PrecostingTrim_det>GetPrecostrateTrimsAddDetails(int Id);
       IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsEditDetails(int Id);

        IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricAddDetails(int Id);
        IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricEditDetails(int Id);

        IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentAddDetails(int Id);
        IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentEditDetails(int Id);

        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnAddDetails(int Id);
        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnEditDetails(int Id);

        IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessAddDetails(int Id);
        IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessEditDetails(int Id);
        bool UpdateDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet);
        bool DeleteDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet);
    }
}
