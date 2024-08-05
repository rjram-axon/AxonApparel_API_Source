using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IPortOfLoadingBusiness
    {
        /// <summary>
        /// This method will return PortOfLoading list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<PortOfLoading>> GetPortOfLoading();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// 
        Response<PortOfLoading> GetPortOfLoadingId(int PortofLoadingId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="PortOfLoading"></param>
        /// <returns></returns>
        Response<int> CreatePortOfLoading(PortOfLoading PortOfLoadingAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="PortOfLoading"></param>
        /// <returns></returns>
        Response<bool> UpdatePortOfLoading(PortOfLoading PortOfLoadingUpd);



        Response<bool> DeletePortOfLoading(int PortofLoadingId);
        Response<IList<PortOfLoading>> GetPortOfLoadingCheckItemDetails(int PortofLoadingId);
    }
}
