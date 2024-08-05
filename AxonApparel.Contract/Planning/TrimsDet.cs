using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsDet
    {
        public string orderno { get; set; }
        public string Accorpack { get; set; }
        public string ConvMode { get; set; }
        public string PurforJob { get; set; }
        public string csp { get; set; }
        public string altitem { get; set; }
        public string itemclosure { get; set; }
        public DateTime entrydate { get; set; }
        public int styleid { get; set; }
        public int itemid { get; set; }
        public int acccolorid { get; set; }
        public int accsizeid { get; set; }
        public decimal TotalQty { get; set; }
        public int uomid { get; set; }
        public decimal PrgQty { get; set; }
        public decimal BomQty { get; set; }
        public int puruomid { get; set; }
        public int topuruom { get; set; }
        public int colorid { get; set; }
        public int sizeid { get; set; }
    }
}
