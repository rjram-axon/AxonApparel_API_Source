using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IWorkDivisionRepository:IBaseRepository<WorkDivision>
    {
        IEnumerable<WorkDivision> GetDataListAll();
    }
}
