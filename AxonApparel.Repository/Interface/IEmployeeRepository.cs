using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {
        IList<Domain.Employee> GetRepEmployeeCheckItemDetails(int empid);
        IEnumerable<Domain.Employee> GetDataListAll();

        IEnumerable<Domain.Employee> GetMerch();
        IEnumerable<Domain.Employee> GetManager();
    }
}
