using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProInvAddLess
    {
        //public int Process_Invid { get; set; }
        //public int Process_Inv_AddLessid { get; set; }
        //public int AddLessid { get; set; }
        //public decimal Percentage { get; set; }
        //public decimal Amount { get; set; }

        public int Pro_Inv_AddlessId { get; set; }
        public int pro_invid { get; set; }
        public int company_unitid { get; set; }
        public int addless_id { get; set; }
        public string Addless { get; set; }
        public decimal percentage { get; set; }
        public decimal amount { get; set; }
        public string aorl { get; set; }
        public int SlNo { get; set; }

    }
}
