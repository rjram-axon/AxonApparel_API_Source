using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurDebitItemdet
    {
        public int Debit_id { get; set; }
        public int Debit_detid { get; set; }
        public int Invid { get; set; }
        public int Itemid { get; set; }
        public int colorid { get; set; }
        public int Sizeid { get; set; }
        public int uomid { get; set; }
        public string Item { get; set; }
        public string color { get; set; }
        public string Size { get; set; }
        public string uom { get; set; }
        public int grn_detid { get; set; }
        public string DocType { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal Qty { get; set; }

        public decimal dQty { get; set; }
        public decimal PoRate { get; set; }
        public decimal Rate { get; set; }
        public decimal dRate { get; set; }
        public decimal Amount { get; set; }
        public decimal Excess_qty { get; set; }
    }

}
