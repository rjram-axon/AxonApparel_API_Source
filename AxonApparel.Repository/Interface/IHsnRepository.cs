using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IHsnRepository:IBaseRepository<Acc_HSNMaster>
    {
        IEnumerable<Domain.HSNCode> GetRepHsncodeCheckItemDetails(int HSNid);
        IEnumerable<Domain.GSTModel> LoadGstDetail();
        IEnumerable<Domain.GSTModel> LoadIGstDetail();
        IEnumerable<Acc_HSNMaster> GetDataListAll();
    }
}
