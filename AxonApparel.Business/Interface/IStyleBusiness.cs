using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Web.Mvc;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public interface IStyleBusiness
    {
        /// <summary>
        /// This method will return Style list
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<Domain.Style>> GetStyle();

        /// <summary>
        /// This method will return Style list
        /// </summary>
        /// <returns></returns>
        //Response<List<Domain.StyleDetail>> GetStyleDetail(int styleId);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Domain.Style> GetStyleId(int styleId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Style"></param>
        /// <returns></returns>
        Response<int> CreateStyle(Domain.Style StyleAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Style"></param>
        /// <returns></returns>
        Response<bool> UpdateStyle(Domain.Style StyleUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Style"></param>
        /// <returns></returns>
        Response<bool> DeleteStyle(int StyleId);

        Response<IList<Domain.Style>> GetStyleCheckItemDetails(int StyleId);
    }
}
