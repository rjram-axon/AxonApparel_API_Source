using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IDescriptionBusiness
    {
        Response<IEnumerable<Description>> GetListMain();
        Response<Description> GetDataById(int DescriptionId);
        Response<bool> UpdateDescription(Description Description);
        Response<bool> DeleteDescription(int DescriptionId);
        Response<int> CreateDesc(Description Description);
    }
}
