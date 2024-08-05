using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IItemGroupRepository:IBaseRepository<ItemGroup>
    {
        IList<Domain.ItemGroup> GetRepItemGroupCheckItemDetails(int ItemGroupId);
        IEnumerable<ItemGroup> GetDataListAll();
    }
}
