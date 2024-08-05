using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPrecostingFabdeptBusiness
    {
        Response<bool> CreateEntry(PreCostFabDept_mas MEntry);
        Response<bool> UpdateEntry(PreCostFabDept_mas MEntry);
        Response<bool> DeleteEntry(PreCostFabDept_mas MEntry);
        Response<IQueryable<Domain.PreCostFabDept_mas>> GetPrecostingmasDetails(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostingAddfabric(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostingEditfabric(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Yarn>> GetPrecostingEditYarn(int Id);
        Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostingEditprocess(int Id);
    }
}
