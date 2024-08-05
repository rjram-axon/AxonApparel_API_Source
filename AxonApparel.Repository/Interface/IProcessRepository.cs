using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IProcessRepository:IBaseRepository<MasterProcess>
    {
        IQueryable<Domain.Process> Getlist();
        IEnumerable<MasterProcess> GetDataListAll();
        IEnumerable<MasterProcess> GetPanelDataListAll();
        IQueryable<Domain.Process> GetSeqDataList();
        IQueryable<Domain.Process> GetSeqDataSeqList();
        IList<Domain.Process> GetRepProcessCheckItemDetails(int processid);
    }
}
