using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IGSTRepository : IBaseRepository<Acc_Gsttaxmaster>
    {
        IList<Domain.GSTModel> GetRepAccountCheckItemDetails(int id);
      //  IQueryable<Acc_Gsttaxmaster> GetGSTList();
        IEnumerable<Acc_Gsttaxmaster> GetDataListAll();
    }
}
