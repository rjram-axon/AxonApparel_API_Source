using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public  class Report_Footer_Email
    {
        public int Rpt_Setupid { get; set; }
        public int Rpt_EmpId { get; set; }
        public int Employeeid { get; set; }
        public string Employee { get; set; }
        public long SlNo { get; set; }
    }
}
