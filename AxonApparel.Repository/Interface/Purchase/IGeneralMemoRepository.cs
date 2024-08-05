using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IGeneralMemoRepository
    {
        IList<Domain.GeneralMemoDet> GetItemLoad( string Itmgrpid);
        int AddData(General_Memo_mas objEntry);
        bool AddDetData(General_Memo_mas obj,List<General_Memo_det> objdet, string Mode, int unitmId = 0);
        bool UpdDetData(General_Memo_mas obj, List<General_Memo_det> objdet, string Mode, int unitmId = 0);
        bool UpdateData(General_Memo_mas objUpd);
        IQueryable<Domain.GeneralMemoMas> GetDataMainList(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate);
        IQueryable<Domain.GeneralMemoDet> GeteditItemLoad(int masid);
        bool DeleteData(int id);
    }
}
