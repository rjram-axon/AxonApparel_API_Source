using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class User_Entry_Log
    {
        public Nullable<int> UserID { get; set; }
        public string ModuleName { get; set; }
        public string EntryName { get; set; }
        public string MachineName { get; set; }
        public string MachineIP { get; set; }
        public string EntryMode { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public string EntryNo { get; set; }
        public int EntryLogid { get; set; }
        public string UserName { get; set; }
    }
}
