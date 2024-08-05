using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ICountryRepository: IBaseRepository<Country>
    {
        IList<Domain.Country> GetRepCountryCheckItemDetails(int countryid);
        IEnumerable<Country> GetAllCountry();
    }
}
