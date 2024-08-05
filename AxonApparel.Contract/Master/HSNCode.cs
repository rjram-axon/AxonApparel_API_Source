using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class HSNCode
    {
        public int HSNid { get; set; }
        public string HSNcode { get; set; }
        public string HSNdesc { get; set; }
        public string Ttype { get; set; }
        public decimal sortorder { get; set; }
        public string rstatus { get; set; }
        public string GSTtaxcode { get; set; }
        public string IGSTtaxcode { get; set; }
        public string enteredby { get; set; }
        public System.DateTime enteredDate { get; set; }
        public string modifiedby { get; set; }
        public System.DateTime modifiedDate { get; set; }
      
    }
}
