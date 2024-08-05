using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IPlanningAddRepository
    {
        IQueryable<PlanningMain> GetDataAddList(int StyleRowId);
        IQueryable<PlanningMain> GetDataPlanDetails(int Id);
        bool DeleteData(int Id);
        bool DeleteFabData(int Id);
        bool DeleteYarnData(int Id);
    }
}
