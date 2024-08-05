using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Department
    {
        public int DepartmentId { get; set; }
        
        public string DepartmentName { get; set; }

        public string IsActive { get; set; }
        public int CountDepartmentId { get; set; }
    }
}