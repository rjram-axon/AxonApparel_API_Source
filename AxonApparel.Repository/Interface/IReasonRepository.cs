using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IReasonRepository : IBaseRepository<Reason>
    {
        IEnumerable<Reason> GetDataAllList();
    }
}
