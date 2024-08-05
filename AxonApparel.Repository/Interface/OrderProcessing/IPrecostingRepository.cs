using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPrecostingRepository
    {
        bool AddDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det>embDet);
        bool UpdateDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet);
        bool DeleteDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet);
        bool AddTrimsDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet);
        bool DeleteTrimsDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet);
        IQueryable<Domain.PrecostingFabTrim_mas> GetPrecostingDetails(int Id);
        IQueryable<Domain.PrecostingTrim_det> GetPrecostTrimsEditDetails(int Id);
        IQueryable<Domain.PrecostingTrim_det> GetPrecostTrimsAddDetails(int Id);
        IQueryable<Domain.PrecostingFabric_det> GetPrecostfabricEditDetails(int Id);
        IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostEmblishmentEditDetails(int Id);
    }
}
