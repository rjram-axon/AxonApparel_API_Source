using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Web.Mvc;

namespace AxonApparel.Business
{
    public interface IFollowUpBusiness
    {
        /// <summary>
        /// This method will return FollowUp list
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<Followup>> GetFollowup();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Followup> GetFollowupId(int followId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<int> CreateFollowup(Followup FollowupAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> UpdateFollowup(Followup FollowupUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> DeleteFollow(int FollowupId);
    }
}
