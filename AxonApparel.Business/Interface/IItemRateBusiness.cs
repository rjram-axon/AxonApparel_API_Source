using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IItemRateBusiness
    {
        Response<bool> CreateItemRate(ItemRate Rate);
        Response<IQueryable<Domain.ItemRate>> GetItemRateTemplate();
        Response<IList<Domain.ItemRate>> GetRateEditBus(int id);
        Response<bool> UpdateItemRateEntry(ItemRate IEEntry);
        Response<bool> DeleteItem(int id);
        Response<bool> DeleteInv(int id);
    }
}
