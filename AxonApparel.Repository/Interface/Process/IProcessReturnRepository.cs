using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IProcessReturnRepository
    {
        IQueryable<Domain.ProcessReturn> Getprocess(int cmpid, int cmunitid);
        IQueryable<Domain.ProcessReturn> Getsupp();
        IQueryable<Domain.ProcessReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int colorid, string ordtype, string ProcessorType, string OrderNo, string ReferNo, int StyleId, int BuyerId);
        IQueryable<Domain.ProcessReturnItemDet> LoadItmdet(string prodord);
        IQueryable<Domain.ProcessReturnItemDet> LoadOpItmdet(string prodord);
        int AddData(Process_Recpt_Mas objEntry);
        int AddData(Process_Cancel_mas objEntry);
        bool AddDetData(Process_Recpt_Mas obj,string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);
        bool AddDetCancelData(Process_Cancel_mas obj,  List<Process_Cancel_det> itm, List<Process_Cancel_jobdet> objdet,List<Domain.ProcessCancel> canobj, string Mode,string RetNo, int unitmId = 0);

        bool UpdDetData(Process_Recpt_Mas obj, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);

        IQueryable<Domain.ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid,int Userid);
        IQueryable<Domain.ProcessReturnItemDet> LoadEditItmdet(int masid, string prodord);
        IQueryable<Domain.ProcessReturnItemDet> LoadRepEditOutdet(int masid);
        bool UpdateData(Process_Recpt_Mas objupd);
        
        bool DeleteDetData(string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0);
        bool UpdateDetCancelData(Process_Cancel_mas Eobj, List<Process_Cancel_det> Eitm, List<Process_Cancel_jobdet> Eobjdet, List<Domain.ProcessCancel> Ecanobj, string Mode, int unitmId = 0);
        bool DeleteDetCancelData(Process_Cancel_mas Dobj, List<Process_Cancel_det> Ditm, List<Process_Cancel_jobdet> Dobjdet, List<Domain.ProcessCancel> Dcanobj, string Mode, int unitmId = 0);
 
   }
}
