using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IReasonBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Reason>> GetReason();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>

        Response<Reason> GetDataById(int ReasonId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Reason"></param>
        /// <returns></returns>

        Response<int> CreateReason(Reason Reason);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Reason"></param>
        /// <returns></returns>

        Response<bool> UpdateReason(Reason Reason);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>

        Response<bool> DeleteReason(int ReasonId);
    }
}
