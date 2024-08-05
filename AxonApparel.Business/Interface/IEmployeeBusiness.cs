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
    public interface IEmployeeBusiness
    {
        /// <summary>
        /// This method will return Employee list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Employee>> GetEmployee();
        Response<IEnumerable<Employee>> GetMerch();
        Response<IEnumerable<Employee>> GetManager();
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Employee> GetEmployeeId(int employeeId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Employee"></param>
        /// <returns></returns>
        Response<int> CreateEmployee(Employee EmployeeAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Employee"></param>
        /// <returns></returns>
        Response<bool> UpdateEmployee(Employee EmployeeUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Employee"></param>
        /// <returns></returns>
        Response<bool> DeleteEmployee(int EmployeeId);
        Response<IList<Employee>> GetEmployeeCheckItemDetails(int EmployeeId);
    }
}
