using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IProcessSetupBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<ProcessSetup>> GetProcessSetup();
        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="ProcessSetupid"></param>
        /// <returns></returns>
        Response<ProcessSetup> GetDataById(int ProcessSetupid);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ProcessSetupid"></param>
        /// <returns></returns>
        Response<int> CreateProcessSetup(ProcessSetup ProcessSetupid);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ProcessSetupid"></param>
        /// <returns></returns>
        Response<bool> UpdateProcessSetup(ProcessSetup ProcessSetupid);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ProcessSetupid"></param>
        /// <returns></returns>
        Response<bool> DeleteProcessSetup(int ProcessSetupid);


        Response<ProcessSetup> GetbyprocessID(int? ProcessId);
    }
}
