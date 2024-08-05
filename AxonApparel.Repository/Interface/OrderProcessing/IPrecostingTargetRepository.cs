using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPrecostingTargetRepository
    {
        IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsAddDetails(string Id);
        IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsEditDetails(string Id);

        IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricAddDetails(int Id);
        IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricEditDetails(int Id);

        IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentAddDetails(string Id);
        IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentEditDetails(string Id);

        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnAddDetails(string Id);
        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnEditDetails(string Id);

        IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessAddDetails(string Id);
        IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessEditDetails(string Id);
        bool UpdateDetData(Precosting_Target_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet);
        bool DeleteDetData(Precosting_Target_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet);
        IQueryable<Precosting_Target_mas> GetPrecostTargetDetails(int? Targetmasid);
        IQueryable<Domain.Precosting_Target_mas> GetPrecostTargetListDetails(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string TargetNo);
    }
}
