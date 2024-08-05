using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IS2PhotoSuitRepository : IBaseRepository<S2PhotoSuit>
    {
        IList<Domain.S2PhotoSuit> GetS2Entry();
    }
}
