using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AxonApparel.Domain
{
   public class Designation
    {
       public int Id { get; set; }

       public string DesignationName { get; set; }

       public string IsActive { get; set; }
       public int CountDesgiId { get; set; }
       public string Employee { get; set; }
       public int Employeeid { get; set; }
       public string Address { get; set; }
       public string Department { get; set; }
       public int Departmentid { get; set; }
    }
}
