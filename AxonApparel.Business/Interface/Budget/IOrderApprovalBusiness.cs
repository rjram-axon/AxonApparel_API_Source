using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IOrderApprovalBusiness
    {
       Response<bool> Update(string OrderNo, int Bmasid, string PA, string PType);
       Response<IList<Domain.BulkOrder>> GetPAStatus(int bmasid);
       Response<IList<Domain.BuyOrderStyle>> GetStyleRowid(string ordno);

    }
}
