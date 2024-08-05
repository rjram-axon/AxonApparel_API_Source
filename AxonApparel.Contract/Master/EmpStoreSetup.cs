using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class EmpStoreSetup
    {
        public Nullable<int> Employeeid { get; set; }
        public Nullable<int> Storeid { get; set; }
        public Nullable<int> Issue { get; set; }
        public Nullable<int> Receipt { get; set; }
        public int Setupid { get; set; }
        public string Employee { get; set; }
        public string StoreName { get; set; }
        public string Designation { get; set; }

        public IList<EmpStoreSetup> SetupList { get; set; }

    }
}
