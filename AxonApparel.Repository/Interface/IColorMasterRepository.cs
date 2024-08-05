using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IColorMasterRepository:IBaseRepository<Color>
    {
        IQueryable<Domain.ColorMaster> GetDataColorList();
        List<Domain.ColorMaster> GetRepColorCheckItemDetails(int colorid);
        IEnumerable<Color> GetDataListAll();
    }

}
