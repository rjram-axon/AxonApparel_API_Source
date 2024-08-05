using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface ICommunicationBusiness
    {
        /// <summary>
        /// This method will return Communication list
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<Communication>> GetCommunication();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Communication> GetCommunicationId(int communicationId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Communication"></param>
        /// <returns></returns>
        Response<int> CreateCommunication(Communication CommunicationAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Communication"></param>
        /// <returns></returns>
        Response<bool> UpdateCommunication(Communication CommunicationUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Communication"></param>
        /// <returns></returns>
        Response<bool> DeleteCommunication(int CommunicationId);
    }
}
