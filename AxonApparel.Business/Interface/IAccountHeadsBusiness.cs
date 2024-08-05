using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IAccountHeadsBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<AccountHeads>> GetAccountHeads();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AddlesId"></param>
        /// <returns></returns>

        Response<AccountHeads> GetDataById(int addlessid);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AccountHeads"></param>
        /// <returns></returns>

        Response<int> CreateAccountHeads(AccountHeads AccHead);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AccountHeads"></param>
        /// <returns></returns>

        Response<bool> UpdateAccountHeads(AccountHeads AccHead);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="addlessid"></param>
        /// <returns></returns>

        Response<bool> DeleteAccountHeads(int addlessid);

        Response<IList<AccountHeads>> GetAccountHeadsCheckItemDetails(int addlessid);
    }
}
