using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IOverHeadsBusiness
    {
       Response<IEnumerable<OverHeads>> GetOverHeads();
       Response<OverHeads> GetOverHeadsId(int OverHeadsId);
        Response<int> CreateOverHeads(OverHeads OverHeadsAdd);
        Response<bool> UpdateOverHeads(OverHeads OverHeadsUpd);
        Response<bool> DeleteOverHeads(int OverHeadsId);
    }
}
