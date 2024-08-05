using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IPortOfLoadingRepository : IBaseRepository<PortofLoading>
    {
        IList<Domain.PortOfLoading> GetRepPortCheckItemDetails(int portid);
        IEnumerable<Domain.PortOfLoading> GetDataListAll();
    }
}
