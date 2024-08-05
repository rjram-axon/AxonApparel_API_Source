using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IGeneralReceiptRepository
    {
        int AddData(Gen_MemoRet_mas objEntry);
        bool AddDetData(Gen_MemoRet_mas obj,List<Gen_MemoRet_det> objdet, string Mode, int unitmId = 0);
        bool UpdDetData(Gen_MemoRet_mas obj, List<Gen_MemoRet_det> objdet, string Mode, int unitmId = 0);
        IQueryable<Domain.GeneralMemoRetDet> GetIssueno();
        IQueryable<Domain.GeneralMemoRetDet> LoadItem(int masid);
        IQueryable<Domain.GeneralMemoRetMas> LoadMaingrid(string entryno,int? masid,int? cmpid,int? unitid,string fromdate,string todate);
        IQueryable<Domain.GeneralMemoRetMas> Loadheaderdet(int masid);
        IQueryable<Domain.GeneralMemoRetDet> Loadedititmdet(int masid);
        bool UpdateData(Gen_MemoRet_mas objUpd);
        bool DeleteData(int id);
    }
}
