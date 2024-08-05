using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IStoreUnitBusiness
    {
        Response<IEnumerable<StoreUnit>> GetStore();
        Response<StoreUnit> GetStoreId(int StoreId);
        Response<int> CreateStore(StoreUnit StoreAdd);
        Response<bool> UpdateStore(StoreUnit StoreUpd);
        Response<bool> DeleteStore(int StoreId);
        Response<IList<StoreUnit>> GetStoreUnitCheckItemDetails(int StoreId);
    }
}

