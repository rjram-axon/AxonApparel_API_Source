using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface ILotSplitUpAddRepository
    {
       IList<LotSplitUp> GetDataLotRepDetails(string OrderType, string StockType, int? SupplierId, int? Companyid, string TransNo, int? ProcessId);

       IQueryable<LotSplitUp> GetDataLotDropRepDetails(string OrderType, string StockType);
       IQueryable<LotSplitUp> GetDataLotDropSuppRepDetails(string OrderType, string StockType);
       IQueryable<LotSplitUp> GetDataLotDropTransNoRepDetails(string OrderType, string StockType);
    }
}
