using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IProcessBusines
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Process>> GetProcess();
        Response<IEnumerable<Process>> GetPanelProcess();
        Response<IQueryable<Process>> GetProcessSeqSetUp();
        Response<IQueryable<Process>> GetProcessSeqSetSeqUp();
        Response<IQueryable<Process>> GetProgramlist();
        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="ProcessId"></param>
        /// <returns></returns>
        Response<Process> GetDataById(int ProcessId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Process"></param>
        /// <returns></returns>
        Response<int> CreateProcess(Process Process);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Process"></param>
        /// <returns></returns>
        Response<bool> UpdateProcess(Process Process);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ProcessId"></param>
        /// <returns></returns>
        Response<bool> DeleteProcess(int ProcessId);
        Response<IList<Process>> GetProcessCheckItemDetails(int ProcessId);
    }
}
