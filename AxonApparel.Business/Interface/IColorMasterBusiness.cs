using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;


namespace AxonApparel.Business
{
    public interface IColorMasterBusiness
    {
        Response<IEnumerable<ColorMaster>> GetColorMaster();
        Response<ColorMaster> GetColorMasterId(int ColorMasterId);
        Response<int> CreateColorMaster(ColorMaster ColorMasterAdd);
        Response<bool> UpdateColorMaster(ColorMaster ColorMasterUpd);
        Response<bool> DeleteColorMaster(int ColorMasterId);
        Response<IList<ColorMaster>> GetColorCheckItemDetails(int ColorId);
    }
}
