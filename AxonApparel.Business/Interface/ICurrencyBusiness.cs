using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface ICurrencyBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Currency>> GetCurrency();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CurrencyID"></param>
        /// <returns></returns>

        Response<Currency> GetDataById(int CurrencyId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Currency"></param>
        /// <returns></returns>

        Response<int> CreateCurrency(Currency Currency);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Currency"></param>
        /// <returns></returns>

        Response<bool> UpdateCurrency(Currency Currency);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="SeasonId"></param>
        /// <returns></returns>

        Response<bool> DeleteCurrency(int CurrencyId);

        Response<IList<Currency>> GetCurrencyCheckItemDetails(int CurrencyId);
    }
}
