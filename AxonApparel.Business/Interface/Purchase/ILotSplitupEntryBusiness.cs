using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ILotSplitupEntryBusiness
    {
        Response<IQueryable<LotSplitUp>> GetDataLotDetails(string TransNo, string EType);
        Response<IList<LotSplitUpItem>> ListLotItemDetails(string TransNo, string EType);

        Response<IQueryable<LotSplitUp>> GetDataEditLotDetails(int LotSplitMasId, string EType);
        Response<IList<LotSplitUpItem>> ListLotEditItemDetails(int LotSplitMasId, string EType);
        Response<IList<LotSplitUpItem>> ListLotEditSplitDetails(int? LotSplitMasId, int? StockId);

        Response<bool> CreateLotSplitEntry(LotSplitUp PLotSplitEntry);
        Response<bool> UpdateLotEntry(LotSplitUp PELEntry);
        Response<bool> DeleteLot(LotSplitUp PoLDEntry);
    }
}
