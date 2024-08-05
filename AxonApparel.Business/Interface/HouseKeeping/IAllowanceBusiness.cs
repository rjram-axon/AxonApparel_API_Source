using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IAllowanceBusiness
    {
        Response<IList<AllowanceSetup>> ListAllItemDetails(int? ItemGroupId, int? ItemId);
        Response<IList<AllowanceSetup>> ListAllItemCDetails(int? ItemId);
        Response<bool> UpdateAllowEntry(AllowanceSetup AllUEntry);
        Response<bool> UpdateProcessAllowEntry(AllowanceSetup AllUPEntry);
        Response<IList<AllowanceSetup>> ListAllProcessDetails(int? ProcessId);
    }
}
