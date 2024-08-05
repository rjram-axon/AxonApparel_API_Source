using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPrecostingBusiness
    {
        Response<bool> CreateEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> UpdateEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> DeleteEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> CreateTrimsEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> UpdateTrimsEntry(PrecostingFabTrim_mas MEntry);
        Response<bool> DeleteTrimsEntry(PrecostingFabTrim_mas MEntry);
        Response<IQueryable<Domain.PrecostingFabTrim_mas>> GetPrecostingDetails(int Id);
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostTrimsEditDetails(int Id);
        Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostTrimsAddDetails(int Id);
        Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostfabricEditDetails(int Id);
        Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostEmblishmentEditDetails(int Id);
    }
}
