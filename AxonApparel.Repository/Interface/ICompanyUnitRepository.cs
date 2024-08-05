using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ICompanyUnitRepository:IBaseRepository<CompanyUnit>
    {
        IList<Domain.CompanyUnit> GetRepCompUnitCheckItemDetails(int CompanyUnitId);
        IEnumerable<CompanyUnit>GetDataListAll();
    }
}
