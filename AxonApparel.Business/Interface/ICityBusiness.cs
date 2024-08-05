using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Web.Mvc;

namespace AxonApparel.Business
{
    public interface ICityBusiness
    {
        /// <summary>
        /// This method will return City list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<City>> GetCity();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<City> GetCityId(int cityId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<int> CreateCity(City CityAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> UpdateCity(City CityUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> DeleteCity(int CityId);

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //Response<SelectListItem> GetCityName();
        Response<IList<City>> GetCityCheckItemDetails(int CityId);
    }
}
