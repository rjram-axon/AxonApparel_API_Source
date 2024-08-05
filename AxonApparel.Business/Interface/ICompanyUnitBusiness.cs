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
    public interface ICompanyUnitBusiness
    {
        /// <summary>
        /// This method will return CompanyUnit list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<CompanyUnit>> GetCompanyUnit();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<CompanyUnit> GetCompanyUnitId(int companyunitId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="CompanyUnit"></param>
        /// <returns></returns>
        Response<int> CreateCompanyUnit(CompanyUnit CompanyUnitAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="CompanyUnit"></param>
        /// <returns></returns>
        Response<bool> UpdateCompanyUnit(CompanyUnit CompanyUnitUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> DeleteCompanyUnit(int CompanyUnitId);
        Response<IList<CompanyUnit>> GetCompUnitCheckItemDetails(int CompanyUnitId);
    }
}
