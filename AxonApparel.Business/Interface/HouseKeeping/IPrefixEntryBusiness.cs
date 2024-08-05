using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPrefixEntryBusiness
    {
        Response<IList<PrefixEntry>> ListAllItemDetails(int? PrefixId);
        Response<bool> UpdatePrefixEntry(PrefixEntry AllUEntry);
    }
}
