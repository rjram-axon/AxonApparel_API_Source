using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IUpdateScriptRepository
    {
        IEnumerable<Domain.UpdateScript> Update(DateTime Lastdate, DateTime entrydate);

    }
}
