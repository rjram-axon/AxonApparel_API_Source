using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class PurInvAddless
    {
        public int Pur_Inv_AddlessId { get; set; }
        public int pur_invid { get; set; }
        public int company_unitid { get; set; }
        public int addless_id { get; set; }
        public string Addless { get; set; }
        public decimal percentage { get; set; }
        public decimal amount { get; set; }
        public string aorl { get; set; }
        public int SlNo { get; set; }

        //public int Pur_Ord_Discountid { get; set; }
        //public int Pur_Ord_id { get; set; }
        //public int Addlessid { get; set; }
        //public string Addless { get; set; }
        //public string PlusOrMinus { get; set; }
        //public decimal Percentage { get; set; }
        //public decimal Amount { get; set; }
    }
    

}
