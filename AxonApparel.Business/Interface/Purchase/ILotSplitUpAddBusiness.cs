using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface ILotSplitUpAddBusiness
    {
       Response<IList<LotSplitUp>> GetDataLotAddDetails(string OrderType, string StockType, int? SupplierId, int? Companyid, string TransNo, int? ProcessId);
       Response<IQueryable<LotSplitUp>> GetDataLotDropDetails(string OrderType, string StockType);
       Response<IQueryable<LotSplitUp>> GetDataLotSuppDropDetails(string OrderType, string StockType);
       Response<IQueryable<LotSplitUp>> GetDataLotTransNoDropDetails(string OrderType, string StockType);
    }
}
