using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IGeneralProcessReceiptRepository
    {
        IQueryable<Domain.ProcessReceiptMas> Getprocess(int cmpid, int cmunitid, string ordtype);
        IQueryable<Domain.ProcessReceiptMas> Getprocessor();
        IQueryable<Domain.ProcessReceiptMas> Getwrkdiv();
        IQueryable<Domain.ProcessReceiptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProcessReceiptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProcessReceiptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed);
        IQueryable<Domain.ProcessReceiptDet> LoadItmgrid(string pid);
        IQueryable<Domain.ProcessReceiptJobdet> Loadjobdetgrid(string pid);
        int AddData(Process_Recpt_Mas objEntry);
        bool AddDetData(Process_Recpt_Mas obj,string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0);
        bool UpdDetData(Process_Recpt_Mas obj, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0);
        IQueryable<Domain.ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid);
        IQueryable<Domain.ProcessReceiptDet> LoadEditItmgrid(int pid);
        IQueryable<Domain.ProcessReceiptJobdet> LoadEditjobdetgrid(int pid);
        IQueryable<Domain.ProcessReceiptDet> ChkDC(string recpt, int pid);
        bool UpdateData(Process_Recpt_Mas objupd);
        bool DeleteDetData(string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0);

    }
}
