using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IProcessSeqProcRepository
    {
        IQueryable<ProcessSequenceMain> GetDataPlanDetails(int StyleRId);
        IQueryable<ProcessSequenceMain> GetDataAddList();
        IQueryable<ProcessSequenceMain> GetStylerowid(int pid);
        IQueryable<ProcessSequenceMain> GetRepProSeq(List<ProcessSeq> objProDet, string JobNo);
        IQueryable<ProcessSequenceMain> GetRepPrgProSeq(List<ProcessSeq> objProDet, string JobNo);

        bool GetRepAutoPrg(List<ProcessSeq> objProDet, string JobNo, int UserId);


        bool AddDetData(ProcessSeq_Mas objPlan,List<ProcessSeq> objPDet);
        IList<ProcessList> GetProcSeqDetList(int StyleRId);

        bool UpdateDetData(ProcessSeq_Mas objAd,List<ProcessSeq> objAdDet);
    }
}
