using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OpenDebitDet
    {
        public int DebitDetId { get; set; }
        public int DebitID { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amt { get; set; }
        public string OrdNo { get; set; }
        public string Refno { get; set; }
        public int BmasId { get; set; }
        public int RefId { get; set; }
        public int JobId { get; set; }
        public string JobNo { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        
    }
}
