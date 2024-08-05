using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IApprovalBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Approval>> GetApproval();
        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="ApprovalId"></param>
        /// <returns></returns>
        Response<Approval> GetDataById(int ApprovalId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Approval"></param>
        /// <returns></returns>
        Response<int> CreateApproval(Approval Approval);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Approval"></param>
        /// <returns></returns>
        Response<bool> UpdateApproval(Approval Approval);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ApprovalId"></param>
        /// <returns></returns>
        Response<bool> DeleteApproval(int ApprovalId);
    }
}
