using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class User_Grant_AlertRights
    {
        public Nullable<int> AlertID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public Nullable<bool> Mail { get; set; }
        public Nullable<bool> SMS { get; set; }
        public Nullable<bool> Popup { get; set; }
        public int detid { get; set; }
        public string Employee { get; set; }
        public string AlertName { get; set; }
        public string EmailAdd { get; set; }
    }
}
