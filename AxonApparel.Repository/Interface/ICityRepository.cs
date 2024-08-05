using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ICityRepository:IBaseRepository<City>
    {
        IList<Domain.City> GetRepCityCheckItemDetails(int cityid);

        IEnumerable<Domain.City> GetDataListAll();
    }
}
