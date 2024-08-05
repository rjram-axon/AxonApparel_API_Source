using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IGeneralProcessReturnRepository
    {
        IQueryable<Domain.ProcessReturn> Getprocess(int cmpid, int cmunitid);
        IQueryable<Domain.ProcessReturn> Getsupp();
        IQueryable<Domain.ProcessReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProcessReturnItemDet> LoadItmdet(string prodord);
        int AddData(Process_Recpt_Mas objEntry);
        bool AddDetData(Process_Recpt_Mas obj,string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);
        bool UpdDetData(Process_Recpt_Mas obj, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);

       IQueryable<Domain.ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate);
        IQueryable<Domain.ProcessReturnItemDet> LoadEditItmdet(int masid, string prodord);
        bool UpdateData(Process_Recpt_Mas objupd);
        bool DeleteDetData(string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);

    }
}
