using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IP2EntryRepository:IBaseRepository<P2Entry>
    {
        IList<Domain.P2Entry> GetP2Entry();
    }
}
