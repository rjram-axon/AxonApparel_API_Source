using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStyleGroupBusiness
    {
        Response<IQueryable<StyleGroup>> GetStyleGroup();
        Response<StyleGroup> GetStyleGroupId(int StyleGroupId);
        Response<int> CreateStyleGroup(StyleGroup StyleGroupAdd);
        Response<bool> UpdateStyleGroup(StyleGroup StyleGroupUpd);
        Response<bool> DeleteStyleGroup(int StyleGroupId);
    
    }
}
