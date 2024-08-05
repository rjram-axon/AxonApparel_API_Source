using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IColorCodeBusiness
    {
        Response<IQueryable<ColorCode>> GetColorCode();
        Response<ColorCode> GetId(int Id);
        Response<int> CreateColorCode(ColorCode ColorCodeAdd);
        Response<bool> UpdateColorCode(ColorCode ColorCodeUpd);
        Response<bool> DeleteColorCode(int Id);
    
    }
}
