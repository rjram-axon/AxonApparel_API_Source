using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IBuyerItemRateBusiness
    {
        Response<IQueryable<BuyerItemRate>> GetListDetails(int? BuyerId, int? ItemId, int? ColorId, int? SizeId, int? SupplierId);
    }
}
