using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface ICountryBusiness
    {
        /// <summary>
        /// This method will return Country list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Country>> GetCountry();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Country> GetCountryId(int countryId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Country"></param>
        /// <returns></returns>
        Response<int> CreateCountry(Country CountryAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Country"></param>
        /// <returns></returns>
        Response<bool> UpdateCountry(Country CountryUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Country"></param>
        /// <returns></returns>
        Response<bool> DeleteCountry(int CountryId);
        Response<IList<Country>> GetCountryCheckItemDetails(int CountryId);

        Response<IEnumerable<Country>> GetAllBusCountry();
    }
}
