using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPrecostingFabdeptRepository
    {
        bool AddDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> yarnDet, List<PrecostFabDept_Process> procDet);
        bool UpdateDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> yarnDet, List<PrecostFabDept_Process> procDet);
        bool DeleteDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> yarnDet, List<PrecostFabDept_Process> procDet);
        IQueryable<Domain.PreCostFabDept_mas> GetPrecostingmasDetails(int Id);
        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostingAddfabric(int Id);
        IQueryable<Domain.PrecostFabDept_Fab> GetPrecostingEditfabric(int Id);
        IQueryable<Domain.PrecostFabDept_Yarn> GetPrecostingEditYarn(int Id);
        IQueryable<Domain.PrecostFabDept_Process> GetPrecostingEditprocess(int Id);

    }
}
