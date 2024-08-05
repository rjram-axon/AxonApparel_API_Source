using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ILotSplitUpEntryRepository
    {
        IQueryable<LotSplitUp> GetRepLotEntryLoad(string TransNo, string EType);
        IList<LotSplitUpItem> GetRepLotItemLoad(string TransNo, string EType);

        IQueryable<LotSplitUp> GetRepLotEditEntryLoad(int LotSplitMasId, string EType);
        IList<LotSplitUpItem> GetRepLotEditItemLoad(int LotSplitMasId, string EType);
        IList<LotSplitUpItem> GetRepLotEditSplitLoad(int? LotSplitMasId, int? StockId);
        int AddData(LotSplitMas objPLoEntry);
        bool AddDetData(LotSplitMas objPLoEntry,List<LotSplitDet> objPLoDet,string TransNo,DateTime EntryDate,string EntryNo,int CompId,int SuppId);

        bool UpdateData(LotSplitMas objPoEEntry);
        bool UpdateDetData(LotSplitMas objPoEEntry,List<LotSplitDet> objPoEDet, int LotMasId, string TransNo, DateTime EntryDate, string EntryNo, int CompId);
        bool DeleteData(List<LotSplitDet> objPoOrd, int Id);
    }
}
