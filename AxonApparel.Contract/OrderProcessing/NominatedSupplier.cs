using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class NominatedSupplier
    {
        //Nominated Supplier
        public int SupplierId { get; set; }
        public int ItemId { get; set; }
        public string Supplier { get; set; }
        public string Item { get; set; }
        public string NSOrderNo { get; set; }
        public int NomSupId { get; set; }
    }
}
