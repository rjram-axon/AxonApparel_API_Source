using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPrecostingTargetBusiness
    {
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsAddDetails(string Id);
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsEditDetails(string Id);

        Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricAddDetails(int Id);
        Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricEditDetails(int Id);

        Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentAddDetails(string Id);
        Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentEditDetails(string Id);

        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnAddDetails(string Id);
        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnEditDetails(string Id);

        Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessAddDetails(string Id);
        Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessEditDetails(string Id);

        Response<bool> CreateEntry(Precosting_Target_mas MEntry);
        //Response<bool> UpdateEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> DeleteEntry(Precosting_Target_mas MEntry);
        Response<IQueryable<Domain.Precosting_Target_mas>> GetPrecostTargetDetails(int? Targetmasid);
        Response<IQueryable<Domain.Precosting_Target_mas>> GetPrecostTargetListDetails(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string TargetNo);
    }
}
