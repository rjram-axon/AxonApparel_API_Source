using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface ICompanyBusiness
    {
        Response<IEnumerable<Company>> GetCompany();
        Response<Company> GetCompanyId(int CompanyId);
        Response<int> CreateCompany(Company CompanyAdd);
        Response<bool> UpdateCompany(Company CompanyUpd);
        Response<bool> DeleteCompany(int CompanyId);
        Response<IQueryable<Company>> GetDataCountDetails(int Id);
        Response<IList<Company>> GetCompCheckItemDetails(int CompanyId);
    }
}
