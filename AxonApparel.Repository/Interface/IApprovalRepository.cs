using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IApprovalRepository:IBaseRepository<Approval>
    {
        IEnumerable<Approval> GetDataListAll();
    }
}
