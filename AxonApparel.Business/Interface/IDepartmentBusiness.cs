using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IDepartmentBusiness
    {
        Response<IEnumerable<Department>> GetDepartment();
        Response<Department> GetDepartmentId(int DepartmentId);
        Response<int> CreateDepartment(Department DepartmentAdd);
        Response<bool> UpdateDepartment(Department DepartmentUpd);
        Response<bool> DeleteDepartment(int DepartmentId);
        Response<IList<Department>> GetDepartmentCheckItemDetails(int DepartmentId);
    }
}
