using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public  interface IColorGroupBusiness
    {
       Response<IQueryable<ColorGroup>> GetColorGroup();
       Response<ColorGroup> GetColorGroupId(int ColorGroupId);
       Response<int> CreateColorGroup(ColorGroup ColorGroupAdd);
       Response<bool> UpdateColorGroup(ColorGroup ColorGroupUpd);
       Response<bool> DeleteColorGroup(int ColorGroupId);
    
    
    }
}
