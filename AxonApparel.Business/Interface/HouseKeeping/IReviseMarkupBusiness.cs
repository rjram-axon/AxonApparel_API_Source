using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IReviseMarkupBusiness
    {
        Response<IQueryable<Domain.ItmStkDet>> LoadMaingrid(string OrdNo, string RefNo, string Tranno, int ItemId, int PrdId, int CompId, string tyid);
        Response<bool> UpdateReviseEntry(Domain.ItmStkDet AllUPEntry);
    }
}
