using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IColorRepository:IBaseRepository<Color>
    {
        IList<Domain.Color> GetRepColorCheckItemDetails(int colorid);
    }
}
