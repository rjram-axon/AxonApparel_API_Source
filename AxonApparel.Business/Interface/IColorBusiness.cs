using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IColorBusiness
    {
        Response<IQueryable<Color>> GetColor();
        Response<Color> GetColorId(int ColorId);
        Response<int> CreateColor(Color ColorAdd);
        Response<bool> UpdateColor(Color ColorUpd);
        Response<bool> DeleteColor(int ColorId);
        Response<IList<Color>> GetColorCheckItemDetails(int ColorId);
    
    }
}
