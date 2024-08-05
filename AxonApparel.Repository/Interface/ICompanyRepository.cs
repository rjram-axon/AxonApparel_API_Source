using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
   public interface ICompanyRepository:IBaseRepository<Company>
    {
       IQueryable<Domain.Company> GetDataRepCountDetails(int Id);
       IList<Domain.Company> GetRepCompCheckItemDetails(int CompanyId);
       IEnumerable<Domain.Company> GetDataAllList();
    }
}
