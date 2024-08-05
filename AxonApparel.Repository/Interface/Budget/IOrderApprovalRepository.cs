using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IOrderApprovalRepository
    {
        bool Update(string OrderNo, int Bmasid, string PA, string PType);
        IList<Domain.BulkOrder> GetPAStatus(int bmasid);
        IList<Domain.BuyOrderStyle> GetStyleRowid(string ordno);
    }
}
