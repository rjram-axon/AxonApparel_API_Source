using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class GSTModel
    {
        public string GSTtaxcode { get; set; }
        public string GSTtaxdesc { get; set; }
        public decimal CGSTper { get; set; }
        public decimal SGSTper { get; set; }
        public decimal IGSTper { get; set; }
        public decimal Addtaxper { get; set; }
        public string Ttype { get; set; }
        public string rstatus { get; set; }
        public decimal sortorder { get; set; }
        public string enteredby { get; set; }
        public System.DateTime enteredDate { get; set; }
        public string modifiedby { get; set; }
        public System.DateTime modifiedDate { get; set; }
        public string Type { get; set; }
        public int id { get; set; }
    }
}
