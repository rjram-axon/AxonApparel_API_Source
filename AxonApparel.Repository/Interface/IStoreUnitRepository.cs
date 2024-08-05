using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IStoreUnitRepository:IBaseRepository<StoreUnit>
    {
       IList<Domain.StoreUnit> GetRepStoreUnitCheckItemDetails(int CompanyUnitId);
       IEnumerable<StoreUnit> GetDataListAll();
    }
}
