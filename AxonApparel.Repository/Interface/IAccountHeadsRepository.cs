using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IAccountHeadsRepository: IBaseRepository<AddLess>
    {
        IList<Domain.AccountHeads> GetRepAccountCheckItemDetails(int accountsid);
        IEnumerable<AddLess> GetDataListAll();
    }
}
