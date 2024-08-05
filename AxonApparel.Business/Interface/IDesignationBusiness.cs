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
    public interface IDesignationBusiness
    {
        /// <summary>
        /// This method will return Designation list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Designation>> GetDesignation();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Designation> GetDesignationId(int DesignationId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Designation"></param>
        /// <returns></returns>
        Response<int> CreateDesignation(Designation DesignationAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Designation"></param>
        /// <returns></returns>
        Response<bool> UpdateDesignation(Designation DesignationUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Designation"></param>
        /// <returns></returns>
        Response<bool> DeleteDesignation(int DesignationId);
        Response<IList<Designation>> GetDesignationCheckItemDetails(int DesignationId);
    }
}
