using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface ISeasonBusiness
    {
     
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Season>> GetSeason();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="SeasonId"></param>
        /// <returns></returns>

        Response<Season> GetDataById(int SeasonId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Season"></param>
        /// <returns></returns>
    
        Response<int> CreateSeason(Season Season);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Season"></param>
        /// <returns></returns>

        Response<bool> UpdateSeason(Season Season);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="SeasonId"></param>
        /// <returns></returns>

        Response<bool> DeleteSeason(int SeasonId);
     
    }
}
