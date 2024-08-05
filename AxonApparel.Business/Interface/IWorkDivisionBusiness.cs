using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IWorkDivisionBusiness
    {
        /// <summary>
        /// This method will return WorkDivision list
        /// </summary>
        /// <returns></returns>
      
        Response<IEnumerable<WorkDivision>> GetWorkDivision();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// 
        Response<WorkDivision> GetWorkDivisionId(int WorkDivisionId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="WorkDivision"></param>
        /// <returns></returns>
        Response<int> CreateWorkDivision(WorkDivision WorkDivisionAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="WorkDivision"></param>
        /// <returns></returns>
        Response<bool> UpdateWorkDivision(WorkDivision WorkDivisionUpd);



        Response<bool> DeleteWorkDivision(int WorkDivisionId);

    }
}
