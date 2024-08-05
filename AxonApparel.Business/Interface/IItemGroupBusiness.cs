using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public  interface IItemGroupBusiness
    {
       Response<IEnumerable<ItemGroup>> GetItemGroup();
        Response<ItemGroup> GetItemGroupId(int ItemGroupId);
        Response<int> CreateItemGroup(ItemGroup ItemGroupAdd);
        Response<bool> UpdateItemGroup(ItemGroup ItemGroupUpd);
        Response<bool> DeleteItemGroup(int ItemGroupId);
        Response<IList<ItemGroup>> GetItemGroupCheckItemDetails(int ItemGroupId);
    }
}
