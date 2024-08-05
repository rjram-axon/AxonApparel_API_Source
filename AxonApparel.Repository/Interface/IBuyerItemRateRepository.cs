using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IBuyerItemRateRepository
    {
        IQueryable<BuyerItemRate> GetItemrateMainList(int? BuyerId, int? ItemId, int? ColorId, int? SizeId, int? SupplierId);
    }
}
