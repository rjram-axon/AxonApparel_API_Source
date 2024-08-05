using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IProcessSeqProcBusiness
    {
        Response<IQueryable<ProcessSequenceMain>> GetDataAddList();
        Response<IQueryable<ProcessSequenceMain>> GetDataPlanDetails(int Id);
        Response<IQueryable<ProcessSequenceMain>> Getstylerowid(int Id);
        Response<IQueryable<ProcessSequenceMain>> GetDataByProSeq(int[] Processid, string JobNo);
        Response<IQueryable<ProcessSequenceMain>> GetDataByPrgProSeq(int[] Processid, string JobNo);
        Response<bool> CreateAutoPrgEntry(int[] Processid, string JobNo, int UserId);

        Response<IList<ProcessList>> GetProcSeqList(int styleid);
        Response<bool> UpdateConEntry(ProcessSequenceMain PEntry, int[] UpdsbTwo);
        Response<bool> CreateProcessMainEntry(ProcessSequenceMain PSeqEnty, int[] sbTwo);
    }
}
